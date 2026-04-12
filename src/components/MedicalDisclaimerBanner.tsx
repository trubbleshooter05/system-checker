import Link from "next/link";

type MedicalDisclaimerBannerProps = {
  /** Shorter strip for legal/support pages where the full banner would be repetitive. */
  variant?: "default" | "compact";
};

/**
 * Visible, conservative informational disclaimer — not a substitute for veterinary care.
 * Placed above the fold on health/triage content.
 */
export function MedicalDisclaimerBanner({ variant = "default" }: MedicalDisclaimerBannerProps) {
  if (variant === "compact") {
    return (
      <aside
        className="mb-6 rounded-lg border border-amber-500/35 bg-amber-950/35 px-3 py-2 text-xs leading-relaxed text-amber-100"
        role="note"
      >
        <p>
          <strong className="text-amber-50">Informational only:</strong> This site does not provide
          veterinary diagnosis, prognosis, or treatment. It is not a substitute for a licensed
          veterinarian or emergency care.{" "}
          <Link href="/terms" className="font-medium text-cyan-300 underline underline-offset-2">
            Read terms
          </Link>
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="mb-6 rounded-xl border border-amber-500/40 bg-amber-950/40 px-4 py-3 text-sm text-amber-100"
      role="note"
    >
      <p className="font-semibold text-amber-50">
        Informational only — not a substitute for veterinary care
      </p>
      <p className="mt-2 leading-relaxed text-amber-100/95">
        Symptom Checker Lab provides general educational information and triage-style prompts to help you
        notice urgency and prepare for a conversation with a veterinarian. It does not diagnose conditions,
        predict outcomes, replace a physical or telehealth exam, or replace your veterinarian. For diagnosis,
        treatment, prescription decisions, and emergencies, contact a qualified veterinarian or emergency
        clinic.
      </p>
    </aside>
  );
}
