import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import {
  EDITORIAL_ATTRIBUTION,
  HOME_PAGE_UPDATED,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

const homePath = "/";
const homeDescription =
  "Symptom Checker Lab publishes conservative, triage-oriented dog health guides and a structured symptom check. Informational only: not veterinary diagnosis, treatment, or emergency advice—use a veterinarian for medical decisions.";

export const metadata: Metadata = {
  title: "Dog symptom triage guides & structured checks (informational only)",
  description: homeDescription,
  keywords: [
    "dog symptom triage",
    "dog not eating",
    "dog shaking",
    "veterinary triage education",
    "dog owner information",
  ],
  alternates: {
    canonical: absoluteUrl(homePath),
  },
  openGraph: {
    title: `Dog symptom triage guides & structured checks | ${SITE_NAME}`,
    description: homeDescription,
    url: homePath,
    type: "website",
  },
  twitter: {
    title: `Dog symptom triage guides & structured checks | ${SITE_NAME}`,
    description: homeDescription,
  },
};

function formatDisplayDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Home() {
  const homeUrl = absoluteUrl(homePath);
  const updatedDisplay = formatDisplayDate(HOME_PAGE_UPDATED);

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage`,
    url: homeUrl,
    name: `${SITE_NAME} — educational dog symptom triage`,
    description: homeDescription,
    inLanguage: "en-US",
    dateModified: HOME_PAGE_UPDATED,
    isPartOf: { "@id": `${SITE_URL}#website` },
    publisher: { "@id": `${SITE_URL}#organization` },
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl p-8">
      <JsonLd data={webPageJsonLd} />

      <MedicalDisclaimerBanner />

      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
        Updated {updatedDisplay} · {EDITORIAL_ATTRIBUTION}
      </p>
      <h1 className="mb-4 text-3xl font-bold">{SITE_NAME}</h1>
      <p className="mb-4 text-slate-300">
        Standalone educational pages and a structured, three-step symptom check for dog owners. Content is
        triage-oriented: it helps you notice urgency and prepare questions for your veterinarian—it does not
        diagnose, predict outcomes, or replace an exam.
      </p>
      <p className="mb-6 rounded-lg border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-400">
        <strong className="text-slate-200">Important:</strong> This site provides general information only.
        It is not a substitute for professional veterinary diagnosis, treatment, prescription decisions, or
        emergency care.
      </p>
      <a
        href="/dog-shaking-not-eating"
        className="inline-block rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900"
      >
        Dog shaking and not eating — guide & check
      </a>
    </main>
  );
}
