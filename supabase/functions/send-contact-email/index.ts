import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM = Deno.env.get("RESEND_FROM_EMAIL") || "Portfolio Contact <onboarding@resend.dev>";
const RESEND_TO = Deno.env.get("RESEND_TO_EMAIL") || "nandakalyan2002@gmail.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Resend API key is not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "A valid email address is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0e0e0c; color: #e8e5dd;">
        <div style="border-bottom: 1px solid rgba(212,175,55,.3); padding-bottom: 20px; margin-bottom: 28px;">
          <h1 style="font-size: 22px; margin: 0; color: #d4af37; letter-spacing: -.02em;">New Portfolio Inquiry</h1>
          <p style="font-size: 12px; color: #89867f; margin: 6px 0 0; font-family: monospace; letter-spacing: .08em; text-transform: uppercase;">From your portfolio contact form</p>
        </div>
        <table style="width: 100%; font-size: 14px; line-height: 1.7;">
          <tr><td style="color: #89867f; width: 90px; padding: 8px 0; vertical-align: top; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .06em;">Name</td><td style="color: #e8e5dd; padding: 8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="color: #89867f; padding: 8px 0; vertical-align: top; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .06em;">Email</td><td style="color: #e8e5dd; padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #d4af37; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="color: #89867f; padding: 8px 0; vertical-align: top; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .06em;">Subject</td><td style="color: #e8e5dd; padding: 8px 0;">${escapeHtml(subject || "(no subject)")}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 4px;">
          <p style="color: #89867f; margin: 0 0 10px; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .06em;">Message</p>
          <p style="color: #c4c0b6; margin: 0; line-height: 1.8; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
        <p style="font-size: 11px; color: #55534e; margin-top: 32px; font-family: monospace; letter-spacing: .06em;">Reply directly to ${escapeHtml(email)} or use Reply-All.</p>
      </div>
    `;

    const text = `New Portfolio Inquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "(no subject)"}\n\nMessage:\n${message}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [RESEND_TO],
        reply_to: email,
        subject: subject ? `Portfolio Contact: ${subject}` : `Portfolio Contact from ${name}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      return new Response(
        JSON.stringify({ error: "Failed to send email.", detail: errBody }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
