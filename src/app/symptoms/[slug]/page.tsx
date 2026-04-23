import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SymptomLandingTemplate } from "@/components/symptom/SymptomLandingTemplate";
import { getSymptomPage, getSymptomSlugs } from "@/lib/symptoms/content";
import { SYMPTOM_CONTENT_UPDATED, absoluteUrl } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getSymptomSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getSymptomPage(params.slug);
  if (!page) return {};
  const path = `/symptoms/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
      type: "article",
    },
    twitter: {
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default function SymptomSlugPage({ params }: Props) {
  const page = getSymptomPage(params.slug);
  if (!page) notFound();
  return <SymptomLandingTemplate page={page} updatedIso={`${SYMPTOM_CONTENT_UPDATED}T12:00:00.000Z`} />;
}
