import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { immediateSaveEmailHtml } from "@/lib/email/templates";

const leadSchema = z.object({
  checkId: z.string().uuid(),
  email: z.string().email(),
  dogName: z.string().min(1).max(50),
  sessionId: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const parsed = leadSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid lead payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { checkId, email, dogName, sessionId } = parsed.data;
    const supabaseAdmin = getSupabaseAdmin();

    const { data: checkRow, error: checkError } = await supabaseAdmin
      .from("symptom_checks")
      .select("id, quick_summary, page_slug")
      .eq("id", checkId)
      .eq("event_type", "symptom_check_completed")
      .single();

    if (checkError || !checkRow) {
      return NextResponse.json(
        { error: "Original check not found", details: checkError?.message },
        { status: 404 }
      );
    }

    const followupDueAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    const pageSlug = checkRow.page_slug || "dog-shaking-not-eating";

    const { data: leadRow, error: insertError } = await supabaseAdmin
      .from("symptom_checks")
      .insert({
        event_type: "lead_capture",
        parent_check_id: checkId,
        session_id: sessionId,
        page_slug: pageSlug,
        dog_name: dogName,
        email,
        followup_due_at: followupDueAt,
        metadata: {
          source: "post_assessment_capture",
        },
      })
      .select("id")
      .single();

    if (insertError || !leadRow) {
      return NextResponse.json(
        { error: "Failed to save lead", details: insertError?.message },
        { status: 500 }
      );
    }

    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const appUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: [email],
        subject: `Saved symptom report for ${dogName}`,
        html: immediateSaveEmailHtml({
          dogName,
          summary: checkRow.quick_summary || "Thanks for using the symptom checker.",
          appUrl,
        }),
      });
    }

    return NextResponse.json({
      ok: true,
      leadId: leadRow.id,
      followupDueAt,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected lead capture error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
