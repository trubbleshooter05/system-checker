"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type MainSymptom =
  | "vomiting"
  | "breathing"
  | "toxin"
  | "choking"
  | "lethargy"
  | "other";

type Duration = "just-started" | "hours" | "12-24h" | "more-than-24h";
type ActingNormal = "yes" | "no" | "unsure";
type AgeGroup = "puppy" | "adult" | "senior";
type Severity = "mild" | "moderate" | "severe";

type Outcome = "emergency" | "vet-soon" | "monitor";

type RedFlags = {
  breathing: boolean;
  collapse: boolean;
  repeatedVomiting: boolean;
  toxin: boolean;
  choking: boolean;
  severeLethargy: boolean;
};

const initialRed: RedFlags = {
  breathing: false,
  collapse: false,
  repeatedVomiting: false,
  toxin: false,
  choking: false,
  severeLethargy: false,
};

function computeOutcome(
  red: RedFlags,
  severity: Severity,
  duration: Duration,
  acting: ActingNormal,
  age: AgeGroup
): Outcome {
  if (red.breathing || red.collapse || red.toxin || red.choking) return "emergency";
  if (red.repeatedVomiting || red.severeLethargy) return "emergency";
  if (severity === "severe") return "emergency";
  if (severity === "moderate" && (acting === "no" || duration === "more-than-24h")) return "vet-soon";
  if (acting === "no" && (duration === "12-24h" || duration === "more-than-24h")) return "vet-soon";
  if (age === "puppy" && (acting === "no" || severity !== "mild")) return "vet-soon";
  if (age === "senior" && severity === "moderate") return "vet-soon";
  if (severity === "moderate") return "vet-soon";
  return "monitor";
}

function symptomGuideHref(main: MainSymptom): string {
  switch (main) {
    case "vomiting":
      return "/symptoms/vomiting";
    case "breathing":
      return "/symptoms/breathing-heavy";
    case "toxin":
      return "/symptoms/ate-chocolate";
    case "choking":
      return "/symptoms/choking";
    case "lethargy":
      return "/symptoms/should-i-go-to-the-vet";
    default:
      return "/symptoms/should-i-go-to-the-vet";
  }
}

export function EmergencyChecker() {
  const [main, setMain] = useState<MainSymptom>("vomiting");
  const [duration, setDuration] = useState<Duration>("hours");
  const [acting, setActing] = useState<ActingNormal>("unsure");
  const [age, setAge] = useState<AgeGroup>("adult");
  const [severity, setSeverity] = useState<Severity>("mild");
  const [red, setRed] = useState<RedFlags>(initialRed);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const summary = useMemo(() => {
    const lines = [
      "Symptom Checker Lab — vet-ready summary (informational only, not a diagnosis)",
      `Main concern: ${main}`,
      `Duration: ${duration}`,
      `Otherwise acting normal: ${acting}`,
      `Age group: ${age}`,
      `How strong it seems: ${severity}`,
      `Red flags checked: ${Object.entries(red)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(", ") || "none"}`,
      outcome ? `Suggested triage band: ${outcome}` : "",
    ];
    return lines.filter(Boolean).join("\n");
  }, [acting, age, duration, main, outcome, red, severity]);

  function runCheck() {
    setOutcome(computeOutcome(red, severity, duration, acting, age));
  }

  function reset() {
    setOutcome(null);
    setRed(initialRed);
  }

  return (
    <div className="space-y-8">
      {!outcome ? (
        <div className="space-y-6 rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
          <div>
            <label className="block text-sm font-medium text-slate-200">What symptom are you seeing?</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100"
              value={main}
              onChange={(e) => setMain(e.target.value as MainSymptom)}
            >
              <option value="vomiting">Vomiting / stomach upset</option>
              <option value="breathing">Breathing looks off / panting</option>
              <option value="toxin">Suspected poisoning / ate something dangerous</option>
              <option value="choking">Choking / gagging</option>
              <option value="lethargy">Very low energy / won’t get up</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200">How long has this been happening?</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100"
              value={duration}
              onChange={(e) => setDuration(e.target.value as Duration)}
            >
              <option value="just-started">Just started</option>
              <option value="hours">A few hours</option>
              <option value="12-24h">About 12–24 hours</option>
              <option value="more-than-24h">More than 24 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200">Acting normal otherwise?</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100"
              value={acting}
              onChange={(e) => setActing(e.target.value as ActingNormal)}
            >
              <option value="yes">Mostly yes</option>
              <option value="no">No / clearly off</option>
              <option value="unsure">Not sure</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200">Age group</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100"
              value={age}
              onChange={(e) => setAge(e.target.value as AgeGroup)}
            >
              <option value="puppy">Puppy</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200">How bad does it seem right now?</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as Severity)}
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>

          <fieldset className="rounded-lg border border-slate-700 p-4">
            <legend className="text-sm font-medium text-slate-200">Any red flags?</legend>
            <p className="mt-1 text-xs text-slate-500">Check all that apply.</p>
            <div className="mt-3 space-y-2 text-sm text-slate-200">
              {(
                [
                  ["breathing", "Trouble breathing / blue gums / constant distress"],
                  ["collapse", "Collapse, seizure-like episode, or can’t stand"],
                  ["repeatedVomiting", "Repeated vomiting or retching"],
                  ["toxin", "Suspected toxin or unknown substance"],
                  ["choking", "Possible choking / object in throat"],
                  ["severeLethargy", "Severe lethargy (won’t respond, very weak)"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={red[key]}
                    onChange={(e) => setRed((r) => ({ ...r, [key]: e.target.checked }))}
                    className="mt-1"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={runCheck}
            className="w-full rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Get recommendation
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <ResultPanel outcome={outcome} />
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="text-sm font-semibold text-slate-100">Related symptom guide</h3>
            <Link
              href={symptomGuideHref(main)}
              className="mt-2 inline-block text-sm font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
            >
              Open matching guide →
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="text-sm font-semibold text-slate-100">Vet-ready summary</h3>
            <p className="mt-2 text-xs text-slate-500">
              Copy this into a message to your clinic. It does not replace an exam.
            </p>
            <textarea
              readOnly
              className="mt-3 h-40 w-full resize-y rounded-lg border border-slate-600 bg-slate-950 p-3 text-xs text-slate-200"
              value={summary}
            />
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(summary);
                } catch {
                  window.prompt("Copy this summary:", summary);
                }
              }}
              className="mt-3 rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-100 hover:bg-slate-800"
            >
              Copy summary
            </button>
          </div>
          <button
            type="button"
            onClick={reset}
            className="text-sm text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

function ResultPanel({ outcome }: { outcome: Outcome }) {
  if (outcome === "emergency") {
    return (
      <div className="rounded-2xl border border-red-500/40 bg-red-950/30 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-200">Emergency</p>
        <h2 className="mt-2 text-xl font-bold text-red-50">Contact a veterinarian or emergency clinic now</h2>
        <p className="mt-3 text-sm text-red-100/90">
          Based on your answers, this pattern is safest to treat as urgent. If you are driving in, call ahead so
          the clinic can prepare.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-red-100/90">
          <li>If your dog is actively choking, collapsing, or not breathing normally, prioritize the nearest ER.</li>
          <li>Bring packaging if a toxin is suspected.</li>
        </ul>
      </div>
    );
  }
  if (outcome === "vet-soon") {
    return (
      <div className="rounded-2xl border border-amber-500/40 bg-amber-950/25 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">Vet soon</p>
        <h2 className="mt-2 text-xl font-bold text-amber-50">Book a veterinary visit soon</h2>
        <p className="mt-3 text-sm text-amber-100/90">
          This doesn&apos;t look like a wait-and-hope situation for most dogs. Same-day or next-day advice from a
          professional is a reasonable plan unless your clinic tells you otherwise.
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-emerald-500/35 bg-emerald-950/20 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">Monitor</p>
      <h2 className="mt-2 text-xl font-bold text-emerald-50">Watch closely and re-check</h2>
      <p className="mt-3 text-sm text-emerald-100/90">
        Based on your answers, many clinics would still want you to call if anything changes. If you are uneasy,
        calling is always okay—this output is educational, not a medical decision.
      </p>
    </div>
  );
}
