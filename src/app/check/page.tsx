import type { Metadata } from "next";
import Link from "next/link";

import { EmergencyChecker } from "@/components/check/EmergencyChecker";
import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const path = "/check";

export const metadata: Metadata = {
  title: "Dog Symptom Checker — Emergency, Vet Soon, or Monitor",
  description:
    "Answer a few questions about your dog’s symptoms. Get a simple urgency suggestion: emergency, vet soon, or monitor—plus a copy-ready summary for your clinic.",
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: `Dog symptom checker | ${SITE_NAME}`,
    description:
      "Fast triage-style questions—not a diagnosis. For emergencies, call a veterinarian or ER immediately.",
    url: path,
  },
};

export default function CheckPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <MedicalDisclaimerBanner />

      <h1 className="mt-4 text-2xl font-bold text-slate-50">Check your dog&apos;s symptoms</h1>
      <p className="mt-3 text-sm text-slate-300">
        Under 60 seconds. Three possible outcomes: <strong className="text-slate-100">emergency</strong>,{" "}
        <strong className="text-slate-100">vet soon</strong>, or <strong className="text-slate-100">monitor</strong>.
        If your dog is collapsing, choking, struggling to breathe, seizuring, or may have been poisoned, skip this
        and call a vet or ER now.
      </p>

      <div className="mt-8">
        <EmergencyChecker />
      </div>

      <p className="mt-10 text-center text-sm text-slate-500">
        <Link href="/symptoms" className="text-cyan-400 hover:underline">
          Browse all symptom guides
        </Link>
      </p>
    </main>
  );
}
