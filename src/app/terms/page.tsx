import type { Metadata } from "next";

import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const path = "/terms";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}: educational content only; not veterinary advice or a substitute for professional care.`,
  alternates: {
    canonical: absoluteUrl(path),
  },
  openGraph: {
    title: `Terms of Use | ${SITE_NAME}`,
    description: `Terms for using ${SITE_NAME} educational tools and content.`,
    url: path,
  },
  twitter: {
    title: `Terms of Use | ${SITE_NAME}`,
    description: `Educational use only; not veterinary diagnosis or treatment. Terms for ${SITE_NAME}.`,
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <MedicalDisclaimerBanner variant="compact" />
      <h1 className="mb-6 text-3xl font-bold">Terms of Use</h1>
      <p className="mb-6 text-sm text-slate-400">
        Last updated: April 11, 2026 · {SITE_NAME} ({SITE_URL})
      </p>
      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-white">Agreement</h2>
          <p>
            By using {SITE_NAME}, you agree to these terms. If you do not agree, do not use the site.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Educational use only</h2>
          <p>
            The site provides general educational information and triage-style prompts. It does{" "}
            <strong>not</strong> provide veterinary diagnosis, prognosis, or treatment. It is{" "}
            <strong>not</strong> a substitute for a licensed veterinarian, including for emergencies.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">No professional relationship</h2>
          <p>
            Use of this site does not create a veterinarian–client relationship. Always consult a qualified
            veterinarian for decisions about your pet&apos;s health.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">No warranties</h2>
          <p>
            Content and tools are provided &quot;as is&quot; without warranties of any kind. We do not guarantee
            completeness, accuracy, or fitness for a particular purpose.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE_NAME} and its operators are not liable for any damages
            arising from use of or reliance on this site. Some jurisdictions do not allow certain limitations; in
            those cases, our liability is limited to the maximum permitted by law.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Changes</h2>
          <p>
            We may update these terms. Continued use after changes constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </main>
  );
}
