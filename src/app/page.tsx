export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-20 text-center dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Roofline Partners
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
          Premium roofing solutions for residential and commercial properties. Trusted
          craftsmanship, lasting results.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            href="#contact"
          >
            Request a Consultation
          </a>
          <a
            className="inline-flex items-center justify-center rounded-md border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800"
            href="#services"
          >
            View Services
          </a>
        </div>
      </div>
    </main>
  );
}
