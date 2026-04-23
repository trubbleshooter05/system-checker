import type { Metadata } from "next";
import Link from "next/link";

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
  "Should you take your dog to the vet right now? Symptom Checker Lab offers fast, symptom-first triage and emergency guides—informational only, not a substitute for a veterinarian.";

export const metadata: Metadata = {
  title: "Should I Take My Dog to the Vet Right Now? | Symptom Checker Lab",
  description: homeDescription,
  keywords: [
    "dog emergency symptoms",
    "take dog to vet",
    "dog vomiting vet",
    "dog choking",
    "dog ate chocolate",
  ],
  alternates: {
    canonical: absoluteUrl(homePath),
  },
  openGraph: {
    title: `Should I take my dog to the vet right now? | ${SITE_NAME}`,
    description: homeDescription,
    url: homePath,
    type: "website",
  },
  twitter: {
    title: `Should I take my dog to the vet right now? | ${SITE_NAME}`,
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

const urgencyCards = [
  {
    title: "Vomiting / diarrhea",
    body: "Yellow or white foam, repeated vomiting, or gut symptoms that won’t settle.",
    href: "/symptoms/vomiting",
  },
  {
    title: "Breathing / panting",
    body: "Heavy breathing, rapid breaths at rest, or panting that doesn’t fit the situation.",
    href: "/symptoms/breathing-heavy",
  },
  {
    title: "Poisoning / choking",
    body: "Chocolate or toxins, something stuck in the throat, or gagging that could block airflow.",
    href: "/symptoms/ate-chocolate",
    secondary: { href: "/symptoms/choking", label: "Choking guide" },
  },
];

export default function Home() {
  const homeUrl = absoluteUrl(homePath);
  const updatedDisplay = formatDisplayDate(HOME_PAGE_UPDATED);

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage`,
    url: homeUrl,
    name: "Should I take my dog to the vet right now?",
    description: homeDescription,
    inLanguage: "en-US",
    dateModified: HOME_PAGE_UPDATED,
    isPartOf: { "@id": `${SITE_URL}#website` },
    publisher: { "@id": `${SITE_URL}#organization` },
  };

  return (
    <div>
      <JsonLd data={webPageJsonLd} />

      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-[#0b1020] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/90">
            Updated {updatedDisplay} · {EDITORIAL_ATTRIBUTION}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Should I take my dog to the vet right now?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Get a quick recommendation based on your dog&apos;s symptoms, plus clear next steps in under 60 seconds.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/check"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Check symptoms now
            </Link>
            <Link
              href="/symptoms"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-500 bg-slate-900/60 px-6 text-sm font-semibold text-slate-100 hover:bg-slate-800"
            >
              Browse dog emergency symptoms
            </Link>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-left text-xs leading-relaxed text-slate-400 sm:text-center sm:text-sm">
            <strong className="text-slate-200">Trust &amp; safety:</strong> This tool is for informational support
            only and does not replace a veterinarian. If your dog is collapsing, choking, having trouble breathing,
            seizing, or you suspect poisoning, contact a veterinarian or emergency clinic immediately.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <MedicalDisclaimerBanner />

        <h2 className="text-xl font-semibold text-slate-50">Common urgent topics</h2>
        <p className="mt-2 text-sm text-slate-400">
          Jump to a guide, then use{" "}
          <Link href="/check" className="font-medium text-cyan-400 underline underline-offset-2">
            Check symptoms now
          </Link>{" "}
          if you&apos;re still unsure.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {urgencyCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-700 bg-slate-900/50 p-5 transition hover:border-cyan-700/60 hover:bg-slate-900"
            >
              <h3 className="text-lg font-semibold text-cyan-300">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{card.body}</p>
              <div className="mt-4 flex flex-col gap-2">
                <Link href={card.href} className="text-sm font-semibold text-cyan-400 hover:underline">
                  Open primary guide →
                </Link>
                {"secondary" in card && card.secondary ? (
                  <Link href={card.secondary.href} className="text-xs font-medium text-slate-400 hover:text-cyan-400 hover:underline">
                    {card.secondary.label} →
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          <Link href="/dog-shaking-not-eating" className="text-cyan-400 hover:underline">
            Dog shaking and not eating
          </Link>{" "}
          — combined guide with structured check
        </p>
      </main>
    </div>
  );
}
