import Link from "next/link";

import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-800 px-4 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-slate-200">{SITE_NAME}</p>
          <p className="mt-2 max-w-md leading-relaxed">
            Educational triage information for dog owners. Not a substitute for veterinary diagnosis or
            treatment.
          </p>
        </div>
        <nav aria-label="Site" className="flex flex-col gap-2 sm:text-right">
          <Link href="/symptoms" className="text-cyan-400 hover:underline">
            Emergency symptoms
          </Link>
          <Link href="/check" className="text-cyan-400 hover:underline">
            Check symptoms
          </Link>
          <Link href="/privacy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-cyan-400 hover:underline">
            Terms of Use
          </Link>
          <Link href="/contact" className="text-cyan-400 hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
