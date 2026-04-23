import type { Metadata } from "next";
import Link from "next/link";

import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import { getAllSymptomPages } from "@/lib/symptoms/content";
import { SITE_NAME, SYMPTOM_CONTENT_UPDATED, absoluteUrl } from "@/lib/site";

const path = "/symptoms";

export const metadata: Metadata = {
  title: "Dog Emergency Symptoms — When to Call the Vet",
  description:
    "Browse urgent dog symptom guides: vomiting, breathing trouble, chocolate toxicity, choking, and more. Quick triage—not a substitute for a veterinarian.",
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: `Dog emergency symptoms | ${SITE_NAME}`,
    description:
      "Plain-English guides for urgent dog health questions, plus a fast symptom checker. Informational only.",
    url: path,
  },
};

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function SymptomsHubPage() {
  const pages = getAllSymptomPages();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <MedicalDisclaimerBanner />

      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        Updated {formatDate(SYMPTOM_CONTENT_UPDATED)}
      </p>
      <h1 className="mt-2 text-balance text-3xl font-bold text-slate-50 sm:text-4xl">Dog emergency symptoms</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        Pick the topic closest to what you&apos;re seeing. Each guide includes red flags, common causes, and a
        clear prompt to use our{" "}
        <Link href="/check" className="font-semibold text-cyan-400 underline underline-offset-2">
          symptom checker
        </Link>{" "}
        if you&apos;re unsure.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">All guides</h2>
        <ul className="space-y-2 text-sm">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link href={`/symptoms/${p.slug}`} className="text-cyan-400 hover:underline">
                {p.h1}
              </Link>
              <span className="text-slate-500"> — </span>
              <span className="text-slate-400">{p.metaDescription.slice(0, 110)}…</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-400">
        <p>
          <strong className="text-slate-200">Also on this site:</strong>{" "}
          <Link href="/dog-shaking-not-eating" className="text-cyan-400 hover:underline">
            Dog shaking and not eating
          </Link>{" "}
          — combined symptom guide with structured check.
        </p>
      </section>
    </main>
  );
}
