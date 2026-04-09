import { z } from "zod";

export const checkerInputSchema = z.object({
  pageSlug: z.string().default("dog-shaking-not-eating"),
  dogName: z.string().min(1).max(50),
  symptoms: z.array(z.string()).min(1),
  duration: z.enum(["hours", "1-2-days", "3-7-days", "over-a-week"]),
  progression: z.enum(["improving", "same", "worsening"]),
  appetite: z.enum(["normal", "reduced", "not-eating"]),
  energy: z.enum(["normal", "lower-than-usual", "very-low"]),
  waterIntake: z.enum(["normal", "slightly-more", "much-more"]),
  notes: z.string().max(1000).optional().default(""),
  sessionId: z.string().min(1),
});

export const checkerOutputSchema = z.object({
  urgency_level: z.enum(["green", "yellow", "red"]),
  explanations: z.array(z.string()).min(2).max(5),
  watch_for: z.array(z.string()).min(3).max(6),
  vet_questions: z.array(z.string()).min(3).max(6),
  follow_up_window: z.string(),
  disclaimer: z.string(),
});

export type CheckerInput = z.infer<typeof checkerInputSchema>;
export type CheckerOutput = z.infer<typeof checkerOutputSchema>;
