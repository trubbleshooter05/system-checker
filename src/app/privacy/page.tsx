import type { Metadata } from "next";

import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const path = "/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects information. Educational site; not veterinary advice.`,
  alternates: {
    canonical: absoluteUrl(path),
  },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Privacy practices for ${SITE_NAME} at symptom.fursbliss.com.`,
    url: path,
  },
  twitter: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `How ${SITE_NAME} handles information at symptom.fursbliss.com. Educational site; not veterinary advice.`,
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <MedicalDisclaimerBanner variant="compact" />
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-6 text-sm text-slate-400">
        Last updated: April 11, 2026 · {SITE_NAME} ({SITE_URL})
      </p>
      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-white">Overview</h2>
          <p>
            {SITE_NAME} provides educational, triage-oriented information for dog owners. This policy describes how
            we handle information when you use our website. We do not provide veterinary diagnosis or treatment
            through this policy or this site.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Information we may collect</h2>
          <ul className="list-disc pl-5">
            <li>
              <strong>Usage and technical data:</strong> standard server and analytics data such as approximate
              region, device type, and pages viewed, as typical for websites.
            </li>
            <li>
              <strong>Symptom check inputs:</strong> if you use interactive features, the details you submit may be
              processed to generate an informational response and may be stored as part of that session.
            </li>
            <li>
              <strong>Email address:</strong> if you choose to save a report or receive follow-up, we process the
              email you provide for that purpose.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">How we use information</h2>
          <p>
            We use information to operate the site, improve reliability and safety, send optional follow-ups you
            request, and comply with law. We do not sell your personal information as a product.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Not medical records</h2>
          <p>
            Content on this site is educational only. Information you submit is not a substitute for veterinary
            medical records or professional care.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            For privacy-related requests, use the{" "}
            <a href="/contact" className="text-cyan-400 hover:underline">
              Contact
            </a>{" "}
            page. We will respond consistent with applicable law and operational capacity.
          </p>
        </section>
      </div>
    </main>
  );
}
