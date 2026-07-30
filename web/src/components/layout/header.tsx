import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNavigation } from "./mobile-navigation";
import { ACCESSIBILITY_COPY } from "@/lib/copy";

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
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/94 backdrop-blur-xl">
      <Container className="flex h-header items-center justify-between gap-6">
        <Logo companyName={companyName} />
        <nav aria-label={ACCESSIBILITY_COPY.primaryNavigation} className="hidden items-center gap-7 lg:flex">
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
            className={cn(buttonVariants(), "h-11")}
          >
            {labels.cta}
          </Link>
        </div>
        <MobileNavigation locale={locale} labels={labels} />
      </Container>
    </header>
  );
}
