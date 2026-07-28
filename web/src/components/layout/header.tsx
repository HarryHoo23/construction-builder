import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNavigation } from "./mobile-navigation";

type Labels = {
  home: string;
  projects: string;
  services: string;
  about: string;
  contact: string;
  cta: string;
  menu: string;
  close: string;
};

export function Header({
  locale,
  labels,
  companyName,
}: {
  locale: Locale;
  labels: Labels;
  companyName: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur">
      <Container className="flex h-[73px] items-center justify-between gap-6">
        <Logo companyName={companyName} />
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          <NavLink href="/">{labels.home}</NavLink>
          <NavLink href="/projects">{labels.projects}</NavLink>
          <NavLink href="/services">{labels.services}</NavLink>
          <NavLink href="/about">{labels.about}</NavLink>
          <NavLink href="/contact">{labels.contact}</NavLink>
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center bg-charcoal px-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:bg-accent"
          >
            {labels.cta}
          </Link>
        </div>
        <MobileNavigation locale={locale} labels={labels} />
      </Container>
    </header>
  );
}
