import Link from "next/link";

import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import { JsonLd } from "@/components/JsonLd";
import type { SymptomPageDefinition, QuickAnswerUrgency } from "@/lib/symptoms/types";
import { getSymptomPage } from "@/lib/symptoms/content";
import { SITE_URL, absoluteUrl } from "@/lib/site";

function urgencyLabel(u: QuickAnswerUrgency): { label: string; className: string } {
  switch (u) {
    case "emergency":
      return { label: "Emergency", className: "border-red-500/50 bg-red-950/50 text-red-100" };
    case "vet-soon":
      return { label: "Vet soon", className: "border-amber-500/50 bg-amber-950/50 text-amber-100" };
    case "monitor":
      return { label: "Monitor", className: "border-sky-500/50 bg-sky-950/40 text-sky-100" };
    case "likely-non-urgent":
      return {
        label: "Likely non-urgent",
        className: "border-emerald-500/50 bg-emerald-950/40 text-emerald-100",
      };
    default:
      return { label: "Monitor", className: "border-slate-600 bg-slate-900 text-slate-200" };
  }
}

type Props = {
  page: SymptomPageDefinition;
  updatedIso: string;
};

export function SymptomLandingTemplate({ page, updatedIso }: Props) {
  const pageUrl = absoluteUrl(`/symptoms/${page.slug}`);
  const { label, className } = urgencyLabel(page.quickAnswer.urgency);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.h1,
    description: page.metaDescription,
    inLanguage: "en-US",
    dateModified: updatedIso,
    isPartOf: { "@id": `${SITE_URL}#website` },
    publisher: { "@id": `${SITE_URL}#organization` },
  };

  const related = page.relatedSlugs
    .map((slug) => ({ slug, p: getSymptomPage(slug) }))
    .filter((x): x is { slug: string; p: SymptomPageDefinition } => Boolean(x.p));

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      <MedicalDisclaimerBanner />

      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
        {page.h1}
      </h1>

      <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/80 p-5" aria-labelledby="quick-answer-heading">
        <h2 id="quick-answer-heading" className="text-lg font-semibold text-slate-100">
          Quick answer
        </h2>
        <p className="mt-3">
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${className}`}>
            {label}
          </span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{page.quickAnswer.body}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-50">When to go to the vet now</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
          {page.vetNowBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-50">Common reasons this happens</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
          {page.commonReasons.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-50">What to do next</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
          {page.nextSteps.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-cyan-900/50 bg-cyan-950/20 p-6">
        <h2 className="text-lg font-semibold text-cyan-50">Not sure?</h2>
        <p className="mt-2 text-sm text-slate-300">
          Run our quick symptom check for a simple urgency suggestion and next steps you can share with your
          veterinarian.
        </p>
        <Link
          href="/check"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Check symptoms now
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-50">FAQ</h2>
        <dl className="mt-4 space-y-6 text-sm text-slate-300">
          {page.faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-slate-100">{f.question}</dt>
              <dd className="mt-2 leading-relaxed">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 border-t border-slate-800 pt-8">
        <h2 className="text-xl font-semibold text-slate-50">Related symptom guides</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link href="/symptoms" className="text-cyan-400 underline-offset-2 hover:underline">
              All dog emergency symptoms
            </Link>
          </li>
          {related.map(({ slug, p }) => (
            <li key={slug}>
              <Link href={`/symptoms/${slug}`} className="text-cyan-400 underline-offset-2 hover:underline">
                {p.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
