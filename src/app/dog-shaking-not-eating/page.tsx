import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import { SymptomChecker } from "@/components/symptom/checker";
import {
  DOG_SHAKING_NOT_EATING_UPDATED,
  EDITORIAL_ATTRIBUTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

const pagePath = "/dog-shaking-not-eating";
const pageUrl = absoluteUrl(pagePath);
const pageTitle = "Dog shaking and not eating: triage guide (informational)";
const pageDescription =
  "Educational triage when your dog is shaking and not eating: urgency signals, what to discuss with your vet, and a structured check. Not a diagnosis or substitute for veterinary care.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "dog shaking",
    "dog not eating",
    "dog trembling",
    "when to call vet",
    "dog triage education",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: pagePath,
    type: "article",
  },
  twitter: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
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

export default function DogShakingNotEatingPage() {
  const updatedDisplay = formatDisplayDate(DOG_SHAKING_NOT_EATING_UPDATED);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#medical-webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "en-US",
        dateModified: DOG_SHAKING_NOT_EATING_UPDATED,
        lastReviewed: DOG_SHAKING_NOT_EATING_UPDATED,
        audience: {
          "@type": "Audience",
          audienceType:
            "Dog owners and caregivers seeking educational triage information (not a substitute for veterinary care)",
        },
        isPartOf: { "@id": `${SITE_URL}#website` },
        publisher: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Dog shaking and not eating: what to do now",
        description: pageDescription,
        datePublished: DOG_SHAKING_NOT_EATING_UPDATED,
        dateModified: DOG_SHAKING_NOT_EATING_UPDATED,
        author: {
          "@type": "Organization",
          name: EDITORIAL_ATTRIBUTION,
        },
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
        isPartOf: { "@id": `${pageUrl}#medical-webpage` },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Is Symptom Checker Lab giving a veterinary diagnosis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. This page offers general educational information and triage-style prompts only. Only a licensed veterinarian who examines your dog can diagnose conditions or prescribe treatment.",
            },
          },
          {
            "@type": "Question",
            name: "When should I contact a veterinarian?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Contact a veterinarian promptly for repeated vomiting, trouble breathing, collapse, severe pain, severe lethargy, or rapidly worsening symptoms. Seek same-day veterinary advice if shaking and not eating last 24 hours or more, energy is very low, or you are unsure.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use this instead of seeing a vet?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Use this content to understand urgency and prepare for a conversation with your veterinarian. It does not replace an in-person or telehealth exam when your dog is ill.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={structuredData} />

      <MedicalDisclaimerBanner />

      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
        Updated {updatedDisplay} · {EDITORIAL_ATTRIBUTION}
      </p>

      <section className="mb-8 rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <h2 className="mb-1 text-xl font-semibold">Urgency triage first</h2>
        <p className="mb-4 text-sm text-slate-300">
          If you are worried right now, use this block first before reading anything else.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-red-400 bg-red-950 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-200">Red: seek emergency care</p>
            <p className="mt-2 text-sm text-red-100">
              Trouble breathing, collapse, repeated vomiting, severe pain, or rapidly worsening symptoms.
            </p>
          </div>
          <div className="rounded-lg border border-amber-400 bg-amber-950 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">Yellow: call vet same day</p>
            <p className="mt-2 text-sm text-amber-100">
              Shaking and not eating lasting 24+ hours, low energy, or no improvement.
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
        <h1 className="mb-2 text-3xl font-bold">Dog shaking and not eating: what to do now</h1>
        <p className="text-slate-300">
          Start with urgency first. Then use the structured checker below to organize what to watch for and what
          to ask your veterinarian.
        </p>
      </header>

      <article className="prose prose-invert prose-slate max-w-none">
        <p>
          If your dog is both shaking and not eating, the key is to notice urgency signals quickly, then track
          progression in a structured way. The lists below are educational prompts to discuss with your
          veterinarian—not a diagnosis.
        </p>

        <h2>Fast triage first</h2>
        <ul>
          <li>
            <strong>Contact your veterinarian promptly</strong> if there is repeated vomiting, trouble breathing,
            collapse, severe lethargy, or signs of pain that are worsening.
          </li>
          <li>
            <strong>Same-day veterinary advice</strong> if symptoms persist beyond 24 hours or you are unsure.
          </li>
          <li>
            <strong>Monitor at home</strong> only if your veterinarian agrees it is appropriate and your dog is
            otherwise stable with mild symptoms.
          </li>
        </ul>

        <h2>Common topics to discuss with your vet</h2>
        <ul>
          <li>GI upset or nausea</li>
          <li>Pain, injury, or fever</li>
          <li>Stress response or environmental trigger</li>
          <li>Medication reaction or dietary change</li>
        </ul>

        <h2>Questions we hear often</h2>
        <h3>Is this a veterinary diagnosis?</h3>
        <p>
          No. Symptom Checker Lab does not diagnose medical conditions. This page explains common urgency patterns
          and helps you prepare for a conversation with your veterinarian.
        </p>
        <h3>When should I contact a veterinarian?</h3>
        <p>
          Seek urgent or emergency care for breathing difficulty, collapse, repeated vomiting, severe pain, or
          rapidly worsening signs. Call your veterinarian the same day if shaking and reduced appetite continue for
          roughly 24 hours or more, energy is very low, or you are unsure what is safe.
        </p>
        <h3>Can I use this instead of seeing a vet?</h3>
        <p>
          No. This tool does not replace an examination, tests, or treatment from a licensed veterinarian. Use it
          only as supplemental education alongside professional care.
        </p>
      </article>

      <div className="mt-10">
        <SymptomChecker />
      </div>
    </main>
  );
}
