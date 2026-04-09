import type { Metadata } from "next";
import { SymptomChecker } from "@/components/symptom/checker";

export const metadata: Metadata = {
  title: "Dog Shaking and Not Eating: What To Do Now",
  description:
    "Clear next steps when your dog is shaking and not eating, including emergency signs and a structured symptom check.",
};

export default function DogShakingNotEatingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="mb-8 rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <h2 className="text-xl font-semibold mb-1">Urgency triage first</h2>
        <p className="mb-4 text-sm text-slate-300">
          If you are panicking right now, use this block first before reading anything else.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-red-400 bg-red-950 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-200">Red: go to ER now</p>
            <p className="mt-2 text-sm text-red-100">
              Trouble breathing, collapse, repeated vomiting, severe pain, or rapidly worsening symptoms.
            </p>
          </div>
          <div className="rounded-lg border border-amber-400 bg-amber-950 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">Yellow: call vet same day</p>
            <p className="mt-2 text-sm text-amber-100">
              Shaking + not eating lasting 24+ hours, low energy, or no improvement.
            </p>
          </div>
          <div className="rounded-lg border border-emerald-400 bg-emerald-950 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">Green: monitor closely</p>
            <p className="mt-2 text-sm text-emerald-100">
              Mild, brief symptoms with normal behavior otherwise and clear improvement.
            </p>
          </div>
        </div>
      </section>

      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dog shaking and not eating: what to do now</h1>
        <p className="text-slate-300">
          Start with urgency first. Then use the structured checker below for clear next steps.
        </p>
      </header>

      <article className="prose prose-invert prose-slate max-w-none">
        <p>
          If your dog is both shaking and not eating, the key is to check for urgency
          signals quickly, then monitor progression in a structured way.
        </p>

        <h2>Fast triage first</h2>
        <ul>
          <li>
            <strong>Call your vet now</strong> if there is repeated vomiting, trouble breathing,
            collapse, severe lethargy, or signs of pain that are worsening.
          </li>
          <li>
            <strong>Same-day vet advice</strong> if symptoms persist beyond 24 hours.
          </li>
          <li>
            <strong>Monitor at home</strong> only if your dog is otherwise stable and symptoms are mild.
          </li>
        </ul>

        <h2>Common drivers to discuss with your vet</h2>
        <ul>
          <li>GI upset or nausea</li>
          <li>Pain, injury, or fever</li>
          <li>Stress response or environmental trigger</li>
          <li>Medication reaction or dietary change</li>
        </ul>
      </article>

      <div className="mt-10">
        <SymptomChecker />
      </div>
    </main>
  );
}
