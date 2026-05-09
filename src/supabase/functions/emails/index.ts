import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    })
  }

  try {
    const { email, totalMonthlySavings, totalAnnualSavings, shareUrl, isHighSavings } = await req.json()

    const emailBody = isHighSavings
      ? `
        <h2>Your AI Spend Audit Results</h2>
        <p>We found <strong>$${totalMonthlySavings}/month ($${totalAnnualSavings}/year)</strong> in potential savings.</p>
        <p>View your full audit: <a href="${shareUrl}">${shareUrl}</a></p>
        <hr />
        <h3>Want to capture even more savings?</h3>
        <p>Credex offers discounted AI credits — same tools, lower price.</p>
        <a href="https://credex.rocks" style="background:#4f46e5;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
          Book a Credex consultation
        </a>
        <hr />
        <p style="color:#9ca3af;font-size:12px;">AI Spend Audit · credex.rocks</p>
      `
      : `
        <h2>Your AI Spend Audit Results</h2>
        <p>Your AI stack looks well optimized — <strong>$${totalMonthlySavings}/month</strong> in potential savings identified.</p>
        <p>View your full audit: <a href="${shareUrl}">${shareUrl}</a></p>
        <p>We'll keep an eye out for new optimizations for your stack.</p>
        <hr />
        <p style="color:#9ca3af;font-size:12px;">AI Spend Audit · credex.rocks</p>
      `

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "AI Spend Audit <onboarding@resend.dev>",
        to: [email],
        subject: `Your AI audit: $${totalMonthlySavings}/mo in savings found`,
        html: emailBody,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }
})