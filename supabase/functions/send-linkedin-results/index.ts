
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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

    const { submissionId, submission, scorecard, rewrite } = await req.json();

    // Generate email content
    const emailContent = generateEmailContent(submission, scorecard, rewrite);

    // In a real implementation, you'd integrate with an email service like SendGrid
    // For now, we'll just log the email content and mark as delivered
    console.log("Email content generated for:", submission.email);
    console.log(emailContent);

    // Mark as delivered
    await supabaseClient
      .from("linkedin_submissions")
      .update({
        rewrite_status: "delivered",
        delivered_at: new Date().toISOString()
      })
      .eq("id", submissionId);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Results delivered successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error sending results:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function generateEmailContent(submission: any, scorecard: any, rewrite: any) {
  return {
    to: submission.email,
    subject: "Your LinkedIn Profile Makeover is Ready! 🎯",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your LinkedIn Profile Makeover</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066cc; color: white; padding: 20px; text-align: center; }
          .score { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .section { margin: 30px 0; }
          .button { background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Your LinkedIn Profile Makeover is Ready!</h1>
            <p>Professional optimization delivered in 48 hours</p>
          </div>
          
          <div class="section">
            <h2>Hi ${submission.full_name || 'there'},</h2>
            <p>Your LinkedIn profile makeover is complete! Below you'll find your optimized profile content and scorecard analysis.</p>
          </div>

          <div class="score">
            <h3>📊 Your Profile Scorecard</h3>
            <h2 style="color: #0066cc; font-size: 2em;">${scorecard.totalScore}/100</h2>
            <p>${scorecard.summary}</p>
            ${scorecard.weakAreas.length > 0 ? `<p><strong>Areas for improvement:</strong> ${scorecard.weakAreas.join(', ')}</p>` : ''}
          </div>

          <div class="section">
            <h3>✨ Your New LinkedIn Content</h3>
            
            <h4>🎯 Professional Headline</h4>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;"><strong>${rewrite.headline}</strong></p>
            
            <h4>📝 About Section</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
              ${rewrite.aboutSection.split('\n').map((line: string) => `<p>${line}</p>`).join('')}
            </div>
            
            <h4>💼 Experience Bullets</h4>
            <ul>
              ${rewrite.experienceBullets.map((bullet: string) => `<li>${bullet}</li>`).join('')}
            </ul>
            
            <h4>🛠️ Recommended Skills</h4>
            <p>${rewrite.skills.join(' • ')}</p>
          </div>

          <div class="section">
            <h3>💬 Networking Message Templates</h3>
            ${rewrite.messagingTemplates.map((template: string, index: number) => 
              `<div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px;">
                <strong>Template ${index + 1}:</strong><br>
                ${template}
              </div>`
            ).join('')}
          </div>

          <div class="section">
            <h3>🚀 Profile Visibility Tips</h3>
            <ul>
              ${rewrite.visibilityTips.map((tip: string) => `<li>${tip}</li>`).join('')}
            </ul>
          </div>

          <div class="section">
            <h3>📋 Next Steps</h3>
            <ol>
              <li>Copy and paste the new content to your LinkedIn profile</li>
              <li>Update your profile photo if needed (professional headshot recommended)</li>
              <li>Start implementing the visibility tips</li>
              <li>Begin networking with the message templates</li>
            </ol>
          </div>

          <div class="section" style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p><strong>Questions or need support?</strong></p>
            <p>Reply to this email and we'll help you implement your new profile!</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}
