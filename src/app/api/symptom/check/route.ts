import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildSymptomPrompt } from "@/lib/symptom/prompt";
import {
  checkerInputSchema,
  checkerOutputSchema,
  type CheckerOutput,
} from "@/lib/symptom/schemas";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

function applyUrgencySafetyFloor(
  input: {
    duration: "hours" | "1-2-days" | "3-7-days" | "over-a-week";
    progression: "improving" | "same" | "worsening";
    appetite: "normal" | "reduced" | "not-eating";
    energy: "normal" | "lower-than-usual" | "very-low";
    symptoms: string[];
  },
  assessment: CheckerOutput
): CheckerOutput {
  const urgentSymptoms = ["collapse", "seizure", "trouble-breathing", "blood-in-vomit", "blood-in-stool"];
  const hasUrgentSymptom = input.symptoms.some((s) => urgentSymptoms.includes(s));
  const worseningNoFood =
    input.appetite === "not-eating" &&
    input.progression === "worsening" &&
    input.energy === "very-low" &&
    input.duration !== "hours";

  if (hasUrgentSymptom || worseningNoFood) {
    return {
      ...assessment,
      urgency_level: "red",
      explanations: [
        "Your dog needs prompt veterinary care today based on this symptom pattern.",
        ...assessment.explanations.slice(1),
      ],
      watch_for: Array.from(
        new Set([
          ...assessment.watch_for,
          "Trouble breathing",
          "Collapse or inability to stand",
          "Repeated vomiting",
        ])
      ).slice(0, 6),
      follow_up_window: "Seek veterinary care now",
    };
  }

  return assessment;
}

export async function POST(request: Request) {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured" },
        { status: 500 }
      );
    }
    const openai = new OpenAI({ apiKey: openaiApiKey });

    const json = await request.json();
    const parsedInput = checkerInputSchema.safeParse(json);

    if (!parsedInput.success) {
      return NextResponse.json(
        { error: "Invalid checker payload", details: parsedInput.error.flatten() },
        { status: 400 }
      );
    }

    const input = parsedInput.data;
    const prompt = buildSymptomPrompt(input);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a conservative dog symptom triage assistant. Never diagnose. Suggest only possible explanations. Return only valid JSON that exactly matches the schema fields.",
        },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "symptom_check_output",
          strict: true,
          schema: z.toJSONSchema(checkerOutputSchema),
        },
      },
      temperature: 0.2,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json({ error: "No assessment returned" }, { status: 502 });
    }

    const parsedOutput = checkerOutputSchema.safeParse(JSON.parse(raw));
    if (!parsedOutput.success) {
      return NextResponse.json(
        { error: "Assessment format invalid", details: parsedOutput.error.flatten() },
        { status: 502 }
      );
    }

    const assessment: CheckerOutput = applyUrgencySafetyFloor(input, parsedOutput.data);
    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("symptom_checks")
      .insert({
        event_type: "symptom_check_completed",
        session_id: input.sessionId,
        page_slug: input.pageSlug,
        dog_name: input.dogName,
        symptoms: input.symptoms,
        duration: input.duration,
        progression: input.progression,
        appetite: input.appetite,
        energy: input.energy,
        water_intake: input.waterIntake,
        notes: input.notes ?? "",
        urgency_level: assessment.urgency_level,
        quick_summary: assessment.explanations[0],
        likely_drivers: assessment.explanations,
        next_actions: assessment.watch_for,
        vet_now_signals: assessment.vet_questions,
        follow_up_window: assessment.follow_up_window,
        disclaimer: assessment.disclaimer,
        metadata: {
          model: "gpt-4o-mini",
        },
      })
      .select("id")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Failed to persist symptom check", details: error?.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      checkId: data.id,
      assessment,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected symptom check error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
