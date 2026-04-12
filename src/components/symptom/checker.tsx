"use client";

import { useMemo, useState } from "react";

type Assessment = {
  urgency_level: "green" | "yellow" | "red";
  explanations: string[];
  watch_for: string[];
  vet_questions: string[];
  follow_up_window: string;
  disclaimer: string;
};

const SYMPTOM_OPTIONS = [
  "shaking",
  "not-eating",
  "vomiting",
  "panting",
  "lethargy",
  "diarrhea",
];

function urgencyStyles(level: Assessment["urgency_level"]) {
  if (level === "red") return "border-red-400 bg-red-950 text-red-100";
  if (level === "yellow") return "border-amber-400 bg-amber-950 text-amber-100";
  return "border-emerald-400 bg-emerald-950 text-emerald-100";
}

export function SymptomChecker() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [checkId, setCheckId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const [dogName, setDogName] = useState("My dog");
  const [symptoms, setSymptoms] = useState<string[]>(["shaking", "not-eating"]);
  const [duration, setDuration] = useState<"hours" | "1-2-days" | "3-7-days" | "over-a-week">(
    "1-2-days"
  );
  const [progression, setProgression] = useState<"improving" | "same" | "worsening">("same");
  const [appetite, setAppetite] = useState<"normal" | "reduced" | "not-eating">("not-eating");
  const [energy, setEnergy] = useState<"normal" | "lower-than-usual" | "very-low">("lower-than-usual");
  const [waterIntake, setWaterIntake] = useState<"normal" | "slightly-more" | "much-more">("normal");
  const [notes, setNotes] = useState("");

  const sessionId = useMemo(() => crypto.randomUUID(), []);

  function toggleSymptom(value: string) {
    setSymptoms((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  async function submitCheck() {
    setLoading(true);
    setError(null);
    setAssessment(null);

    try {
      const response = await fetch("/api/symptom/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageSlug: "dog-shaking-not-eating",
          dogName,
          symptoms,
          duration,
          progression,
          appetite,
          energy,
          waterIntake,
          notes,
          sessionId,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to run check");
      }

      setCheckId(payload.checkId);
      setAssessment(payload.assessment as Assessment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function saveEmail() {
    if (!checkId || !email) return;
    setEmailStatus("saving");

    try {
      const response = await fetch("/api/symptom/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkId,
          email,
          dogName,
          sessionId,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.error ?? "Email save failed");
      setEmailStatus("saved");
    } catch {
      setEmailStatus("error");
    }
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold mb-2">Structured 3-step checker</h2>
      <p className="text-slate-300 mb-6">
        No chatbot. Fast structured triage with clear next actions. Educational triage only — not a diagnosis
        or prescription.
      </p>

      {!assessment && (
        <>
          <div className="mb-4 text-sm text-slate-400">Step {step} of 3</div>

          {step === 1 && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-slate-300">Dog name</span>
                <input
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-2"
                />
              </label>

              <div>
                <p className="text-sm text-slate-300 mb-2">Symptoms right now</p>
                <div className="grid grid-cols-2 gap-2">
                  {SYMPTOM_OPTIONS.map((value) => (
                    <label key={value} className="flex items-center gap-2 rounded border border-slate-700 p-2">
                      <input
                        type="checkbox"
                        checked={symptoms.includes(value)}
                        onChange={() => toggleSymptom(value)}
                      />
                      <span className="text-sm">{value}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-slate-300">How long has this been happening?</span>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-2"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as typeof duration)}
                >
                  <option value="hours">A few hours</option>
                  <option value="1-2-days">1-2 days</option>
                  <option value="3-7-days">3-7 days</option>
                  <option value="over-a-week">Over a week</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Is it improving, same, or worsening?</span>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-2"
                  value={progression}
                  onChange={(e) => setProgression(e.target.value as typeof progression)}
                >
                  <option value="improving">Improving</option>
                  <option value="same">About the same</option>
                  <option value="worsening">Worsening</option>
                </select>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-slate-300">Appetite</span>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-2"
                  value={appetite}
                  onChange={(e) => setAppetite(e.target.value as typeof appetite)}
                >
                  <option value="normal">Normal</option>
                  <option value="reduced">Reduced</option>
                  <option value="not-eating">Not eating</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Energy</span>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-2"
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value as typeof energy)}
                >
                  <option value="normal">Normal</option>
                  <option value="lower-than-usual">Lower than usual</option>
                  <option value="very-low">Very low</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Water intake</span>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-2"
                  value={waterIntake}
                  onChange={(e) => setWaterIntake(e.target.value as typeof waterIntake)}
                >
                  <option value="normal">Normal</option>
                  <option value="slightly-more">Slightly more</option>
                  <option value="much-more">Much more</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Anything else? (optional)</span>
                <textarea
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-2"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={step === 1}
              className="rounded-lg border border-slate-600 px-4 py-2 disabled:opacity-50"
              onClick={() => setStep((current) => Math.max(1, current - 1))}
            >
              Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900"
                onClick={() => setStep((current) => Math.min(3, current + 1))}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                disabled={loading || symptoms.length === 0}
                className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 disabled:opacity-50"
                onClick={submitCheck}
              >
                {loading ? "Checking..." : "Run symptom check"}
              </button>
            )}
          </div>
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        </>
      )}

      {assessment && (
        <div className="space-y-5">
          <div className={`rounded-lg border p-4 ${urgencyStyles(assessment.urgency_level)}`}>
            <p className="text-xs uppercase tracking-wide opacity-90 mb-1">Urgency</p>
            <p className="text-xl font-bold">{assessment.urgency_level.toUpperCase()}</p>
            <p className="mt-2 text-sm">{assessment.explanations[0]}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Possible explanations to discuss with your vet</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-200">
              {assessment.explanations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Watch for these signs next</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-200">
              {assessment.watch_for.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Questions to ask your vet</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-200">
              {assessment.vet_questions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-slate-300">Follow-up window: {assessment.follow_up_window}</p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <h3 className="font-semibold mb-2">Save this report and get a 48h follow-up</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 p-2"
              />
              <button
                type="button"
                onClick={saveEmail}
                disabled={emailStatus === "saving" || email.length < 5}
                className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 disabled:opacity-50"
              >
                {emailStatus === "saving" ? "Saving..." : "Save report"}
              </button>
            </div>
            {emailStatus === "saved" && (
              <p className="mt-2 text-sm text-emerald-300">Saved. Check your email for the summary and follow-up.</p>
            )}
            {emailStatus === "error" && (
              <p className="mt-2 text-sm text-red-300">We could not save your email. Please try again.</p>
            )}
          </div>

          <p className="text-xs text-slate-400">{assessment.disclaimer}</p>
        </div>
      )}
    </section>
  );
}
