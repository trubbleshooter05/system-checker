import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Symptom Checker Lab helps dog owners triage urgent questions like vomiting, breathing trouble, and suspected poisoning. Educational only—not veterinary diagnosis, treatment, or emergency care.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: `${SITE_URL.replace(/\/$/, "")}/contact`,
          availableLanguage: "en-US",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — dog emergency symptom triage (informational only)`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Quick, symptom-first help for dog emergencies: when to call the vet, what to watch for, and a fast checker. Informational only—not a substitute for a veterinarian or ER.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: "/",
    title: `${SITE_NAME} — dog health triage guides (informational only)`,
    description:
      "Educational triage guides and a structured check for dog owners. Not a substitute for veterinary diagnosis, care, or emergencies.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — dog health triage guides (informational only)`,
    description:
      "Conservative, triage-oriented education for dog owners. Informational only—not veterinary diagnosis or treatment.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd data={organizationSchema} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
