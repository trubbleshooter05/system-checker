import { NextResponse } from "next/server";
import { Resend } from "resend";
import { followUpEmailHtml } from "@/lib/email/templates";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return NextResponse.json(
      { error: "Resend not configured" },
      { status: 500 }
    );
  }
  const supabaseAdmin = getSupabaseAdmin();

  const nowIso = new Date().toISOString();
  const { data: dueRows, error } = await supabaseAdmin
    .from("symptom_checks")
    .select("id, email, dog_name, page_slug")
    .eq("event_type", "lead_capture")
    .not("email", "is", null)
    .lte("followup_due_at", nowIso)
    .limit(100);

  if (error) {
    return NextResponse.json(
      { error: "Failed to load due follow-ups", details: error.message },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  let sent = 0;
  let skipped = 0;

  for (const lead of dueRows ?? []) {
    const { data: alreadySent } = await supabaseAdmin
      .from("symptom_checks")
      .select("id")
      .eq("event_type", "followup_sent")
      .eq("parent_check_id", lead.id)
      .limit(1);

    if (alreadySent && alreadySent.length > 0) {
      skipped += 1;
      continue;
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [lead.email as string],
      subject: `48-hour follow-up for ${lead.dog_name || "your dog"}`,
      html: followUpEmailHtml({
        dogName: lead.dog_name || "your dog",
        appUrl,
      }),
    });

    await supabaseAdmin.from("symptom_checks").insert({
      event_type: "followup_sent",
      parent_check_id: lead.id,
      session_id: `cron-${new Date().toISOString()}`,
      page_slug: lead.page_slug || "dog-shaking-not-eating",
      dog_name: lead.dog_name,
      email: lead.email,
      metadata: { source: "cron_followup_v1" },
    });

    sent += 1;
  }

  return NextResponse.json({
    ok: true,
    dueCount: dueRows?.length ?? 0,
    sent,
    skipped,
  });
}
