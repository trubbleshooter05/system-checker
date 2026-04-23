import type { MetadataRoute } from "next";

import { getSymptomSlugs } from "@/lib/symptoms/content";
import {
  DOG_SHAKING_NOT_EATING_UPDATED,
  HOME_PAGE_UPDATED,
  SITE_URL,
  SYMPTOM_CONTENT_UPDATED,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_URL.replace(/\/$/, "");
  const legalModified = new Date("2026-04-11T12:00:00.000Z");
  const symptomModified = new Date(`${DOG_SHAKING_NOT_EATING_UPDATED}T12:00:00.000Z`);
  const homeModified = new Date(`${HOME_PAGE_UPDATED}T12:00:00.000Z`);
  const hubModified = new Date(`${SYMPTOM_CONTENT_UPDATED}T12:00:00.000Z`);

  const symptomRoutes: MetadataRoute.Sitemap = getSymptomSlugs().map((slug) => ({
    url: `${siteUrl}/symptoms/${slug}`,
    lastModified: hubModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: homeModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/symptoms`,
      lastModified: hubModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/check`,
      lastModified: hubModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...symptomRoutes,
    {
      url: `${siteUrl}/dog-shaking-not-eating`,
      lastModified: symptomModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: legalModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: legalModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: legalModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: hubModified,
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];
}
