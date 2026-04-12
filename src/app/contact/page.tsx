import type { Metadata } from "next";

import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const path = "/contact";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} for site-related questions. For pet emergencies, contact a veterinarian or emergency clinic—not this website.`,
  alternates: {
    canonical: absoluteUrl(path),
  },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: `How to reach ${SITE_NAME} for website inquiries.`,
    url: path,
  },
  twitter: {
    title: `Contact | ${SITE_NAME}`,
    description: `Website inquiries for ${SITE_NAME}. Not for pet emergencies—contact a veterinarian or ER.`,
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <MedicalDisclaimerBanner variant="compact" />
      <h1 className="mb-6 text-3xl font-bold">Contact</h1>
      <p className="mb-6 text-sm text-slate-400">
        Last updated: April 11, 2026 · {SITE_NAME} ({SITE_URL})
      </p>
      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300">
        <section className="rounded-xl border border-red-900/60 bg-red-950/30 p-4">
          <h2 className="mt-0 text-lg font-semibold text-red-100">Pet emergency</h2>
          <p className="mb-0">
            If your dog may be having a medical emergency, <strong>call your veterinarian, emergency clinic, or
            local animal ER</strong>. Do not rely on email or this website for urgent care.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Website inquiries</h2>
          <p>
            {SITE_NAME} ({SITE_URL}) is an informational resource. For questions about this website, privacy, or
            terms, use the channel below when available.
          </p>
          {contactEmail ? (
            <p>
              Email:{" "}
              <a className="text-cyan-400 hover:underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
          ) : (
            <p className="text-slate-400">
              A public contact email is not configured for this deployment. Refer to the{" "}
              <a href="/privacy" className="text-cyan-400 hover:underline">
                Privacy Policy
              </a>{" "}
              for data requests. Operators may add <code className="text-slate-300">NEXT_PUBLIC_CONTACT_EMAIL</code>{" "}
              for general inquiries.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
