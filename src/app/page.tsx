export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="mb-4 text-3xl font-bold">Symptom Checker Lab</h1>
      <p className="mb-6 text-slate-300">
        Standalone symptom SEO page and 3-step checker, decoupled from any app dashboard.
      </p>
      <a
        href="/dog-shaking-not-eating"
        className="inline-block rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900"
      >
        Go to first page
      </a>
    </main>
  );
}
