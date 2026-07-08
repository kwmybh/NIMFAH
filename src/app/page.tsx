export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
        Nimfah
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Full-stack starter
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
        A clean Next.js App Router foundation — front-end and typed API route
        handlers in one stack. Edit{" "}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">
          src/app/page.tsx
        </code>{" "}
        to begin.
      </p>
      <div className="mt-8">
        <a
          href="/api/health"
          className="inline-block rounded-lg bg-neutral-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Check API health →
        </a>
      </div>
    </main>
  );
}
