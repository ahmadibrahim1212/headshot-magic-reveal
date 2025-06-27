
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { 
      submissionData,
      userEmail,
      userId 
    } = await req.json();

    // Create submission record
    const { data: submission, error: submissionError } = await supabaseClient
      .from("linkedin_submissions")
      .insert({
        user_id: userId,
        email: userEmail,
        full_name: submissionData.fullName,
        linkedin_url: submissionData.linkedinUrl,
        job_title: submissionData.jobTitle,
        career_goal: submissionData.careerGoal,
        industry: submissionData.industry,
        top_skills: submissionData.topSkills || [],
        target_role: submissionData.targetRole,
        notes: submissionData.notes,
        resume_url: submissionData.resumeUrl
      })
      .select()
      .single();

    if (submissionError) {
      throw new Error(`Failed to create submission: ${submissionError.message}`);
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ 
      email: userEmail, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : userEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: "LinkedIn Profile Makeover",
              description: "Professional LinkedIn profile rewrite and optimization"
            },
            unit_amount: 4900, // $49.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        submission_id: submission.id,
        user_id: userId
      }
    });

    // Create payment record
    await supabaseClient
      .from("payments")
      .insert({
        submission_id: submission.id,
        stripe_session_id: session.id,
        amount: 4900,
        currency: "usd",
        status: "pending",
        stripe_customer_id: customerId
      });

    // Update submission with stripe session ID
    await supabaseClient
      .from("linkedin_submissions")
      .update({ stripe_session_id: session.id })
      .eq("id", submission.id);

    return new Response(JSON.stringify({ 
      url: session.url,
      submissionId: submission.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
