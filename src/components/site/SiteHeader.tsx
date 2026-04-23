import Link from "next/link";

import { SITE_NAME } from "@/lib/site";

const nav = [
  { href: "/symptoms", label: "Emergency symptoms" },
  { href: "/check", label: "Check symptoms" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-bold tracking-tight text-slate-50 hover:text-cyan-300">
          {SITE_NAME}
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-300 hover:text-cyan-400 hover:underline underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
