import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
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
        "Symptom Checker Lab publishes conservative, triage-oriented educational information for dog owners. Content is informational only; it is not veterinary diagnosis, treatment, prescription advice, or a substitute for a licensed veterinarian or emergency services.",
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
    default: `${SITE_NAME} — dog health triage guides & structured checks (informational only)`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Symptom Checker Lab offers conservative, triage-oriented educational guides and a structured symptom check for dog owners. Informational only: not veterinary diagnosis, treatment, or emergency advice—always consult a veterinarian for medical decisions.",
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
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
