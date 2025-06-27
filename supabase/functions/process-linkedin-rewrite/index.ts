
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

    const { submissionId } = await req.json();

    // Get submission data
    const { data: submission, error } = await supabaseClient
      .from("linkedin_submissions")
      .select("*")
      .eq("id", submissionId)
      .single();

    if (error || !submission) {
      throw new Error("Submission not found");
    }

    // Update status to processing
    await supabaseClient
      .from("linkedin_submissions")
      .update({ rewrite_status: "processing" })
      .eq("id", submissionId);

    // Generate LinkedIn scorecard
    const scorecard = await generateLinkedInScorecard(submission);
    
    // Generate LinkedIn rewrite
    const rewrite = await generateLinkedInRewrite(submission);

    // Update submission with results
    await supabaseClient
      .from("linkedin_submissions")
      .update({
        rewrite_status: "completed",
        scorecard_score: scorecard.totalScore,
        scorecard_data: scorecard,
        rewrite_content: rewrite
      })
      .eq("id", submissionId);

    // Send email with results
    await supabaseClient.functions.invoke('send-linkedin-results', {
      body: { 
        submissionId,
        submission,
        scorecard,
        rewrite
      }
    });

    return new Response(JSON.stringify({ 
      success: true,
      scorecard,
      rewrite
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error processing LinkedIn rewrite:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

async function generateLinkedInScorecard(submission: any) {
  // LinkedIn Profile Scoring Logic
  const scores = {
    headlineClarity: analyzeHeadline(submission.linkedin_url),
    aboutSection: analyzeAboutSection(submission.career_goal),
    experienceDetail: analyzeExperience(submission.job_title),
    skillRelevance: analyzeSkills(submission.top_skills, submission.industry),
    profilePhoto: 7, // Default score since we can't analyze actual photo
    seoKeywords: analyzeSEOKeywords(submission.industry, submission.target_role),
    callToAction: analyzeCallToAction(submission.career_goal),
    completeness: analyzeCompleteness(submission),
    engagementElements: 6, // Default score
    visibilitySettings: 8 // Default score
  };

  const totalScore = Math.round(Object.values(scores).reduce((sum, score) => sum + score, 0));
  
  const weakAreas = Object.entries(scores)
    .filter(([_, score]) => score < 6)
    .map(([area, _]) => area.replace(/([A-Z])/g, ' $1').toLowerCase())
    .slice(0, 3);

  return {
    totalScore,
    scores,
    weakAreas,
    summary: generateScorecardSummary(totalScore, weakAreas)
  };
}

function analyzeHeadline(linkedinUrl: string): number {
  // Basic analysis - in real implementation, you'd scrape the actual profile
  return Math.floor(Math.random() * 4) + 3; // 3-6 range for demo
}

function analyzeAboutSection(careerGoal: string): number {
  if (!careerGoal) return 2;
  if (careerGoal.length < 50) return 4;
  if (careerGoal.length < 100) return 6;
  return 8;
}

function analyzeExperience(jobTitle: string): number {
  return jobTitle ? 7 : 4;
}

function analyzeSkills(skills: string[], industry: string): number {
  if (!skills || skills.length === 0) return 3;
  if (skills.length < 3) return 5;
  if (skills.length >= 5) return 8;
  return 6;
}

function analyzeSEOKeywords(industry: string, targetRole: string): number {
  const hasIndustry = !!industry;
  const hasTargetRole = !!targetRole;
  return hasIndustry && hasTargetRole ? 7 : hasIndustry || hasTargetRole ? 5 : 3;
}

function analyzeCallToAction(careerGoal: string): number {
  return careerGoal && careerGoal.length > 30 ? 6 : 3;
}

function analyzeCompleteness(submission: any): number {
  const fields = [
    submission.full_name,
    submission.job_title,
    submission.career_goal,
    submission.industry,
    submission.target_role
  ];
  const completedFields = fields.filter(field => field && field.trim().length > 0);
  return Math.round((completedFields.length / fields.length) * 10);
}

function generateScorecardSummary(totalScore: number, weakAreas: string[]): string {
  if (totalScore >= 80) {
    return "Your LinkedIn profile is strong and well-optimized for recruiters.";
  } else if (totalScore >= 60) {
    return `Your profile has good foundation but needs improvement in: ${weakAreas.join(', ')}.`;
  } else {
    return `Your profile needs significant optimization, especially in: ${weakAreas.join(', ')}.`;
  }
}

async function generateLinkedInRewrite(submission: any) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  
  const prompt = `You are a professional LinkedIn profile writer. Rewrite the following LinkedIn profile to make it optimized for recruiters and career opportunities.

Inputs:
- LinkedIn URL: ${submission.linkedin_url}
- Career Goal: ${submission.career_goal}
- Job Title: ${submission.job_title || 'Not specified'}
- Industry: ${submission.industry || 'Not specified'}
- Top Skills: ${submission.top_skills?.join(', ') || 'Not specified'}
- Target Role: ${submission.target_role}
- Notes: ${submission.notes || 'None'}

Instructions:
- Use a confident, polished tone tailored to professionals
- Highlight achievements and quantifiable impact
- Optimize for LinkedIn SEO and recruiter scans
- Tailor to user's career goal

Please provide:
1. Professional Headline (120 characters max)
2. About Section (2000 characters max)
3. Experience bullets for top 3 roles (focus on impact and results)
4. Top 10 relevant skills for this industry
5. 2 networking message templates
6. 5 profile visibility tips

Format as JSON with these exact keys: headline, aboutSection, experienceBullets, skills, messagingTemplates, visibilityTips`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a professional LinkedIn profile writer and career coach.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const rewriteContent = data.choices[0].message.content;
  
  try {
    return JSON.parse(rewriteContent);
  } catch {
    // Fallback if JSON parsing fails
    return {
      headline: "Professional " + (submission.target_role || submission.job_title || "Professional"),
      aboutSection: `Experienced ${submission.job_title || 'professional'} focused on ${submission.career_goal}`,
      experienceBullets: ["• Delivered exceptional results in previous roles", "• Led cross-functional teams to achieve goals", "• Implemented process improvements"],
      skills: submission.top_skills || ["Leadership", "Strategy", "Communication"],
      messagingTemplates: [
        "Hi [Name], I noticed your work in [Industry] and would love to connect to discuss [Topic].",
        "Hello [Name], I'm interested in learning more about opportunities at [Company]. Would you be open to a brief chat?"
      ],
      visibilityTips: [
        "Update your profile weekly",
        "Post industry insights regularly",
        "Engage with your network's content",
        "Use relevant keywords throughout your profile",
        "Keep your profile photo professional"
      ]
    };
  }
}
