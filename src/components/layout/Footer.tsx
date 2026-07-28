import { site } from "@/content/site";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <Container size="lg">
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          {/* Logo + copyright */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {site.name}
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{site.footer.copyright}</p>
          </div>

          {/* Nav links */}
          <nav
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            aria-label="Footer navigation"
          >
            {site.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:items-end">
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\D/g, "")}`}
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
