import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export function Footer({
  locale,
  labels,
  companyName,
  email,
  phone,
  serviceAreas,
  licence,
  abn,
}: {
  locale: Locale;
  labels: {
    description: string;
    contact: string;
    navigate: string;
    serviceAreas: string;
    rights: string;
    home: string;
    projects: string;
    services: string;
    about: string;
    contactPage: string;
  };
  companyName: string;
  email?: string;
  phone?: string;
  serviceAreas: string[];
  licence?: string;
  abn?: string;
}) {
  return (
    <footer className="bg-charcoal py-14 text-white sm:py-20">
      <Container>
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo companyName={companyName} />
            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              {labels.description}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {labels.navigate}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/">{labels.home}</Link></li>
              <li><Link href="/projects">{labels.projects}</Link></li>
              <li><Link href="/services">{labels.services}</Link></li>
              <li><Link href="/about">{labels.about}</Link></li>
              <li><Link href="/contact">{labels.contactPage}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {labels.contact}
            </h2>
            <div className="mt-5 space-y-3 text-sm">
              {phone ? <p><a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></p> : null}
              {email ? <p><a href={`mailto:${email}`}>{email}</a></p> : null}
            </div>
            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {labels.serviceAreas}
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              {serviceAreas.join(" · ")}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {companyName}. {labels.rights}</p>
          <p>
            {licence ? `${locale === "zh" ? "建筑商执照" : "Builder licence"}: ${licence}` : null}
            {licence && abn ? " · " : null}
            {abn ? `ABN: ${abn}` : null}
          </p>
        </div>
      </Container>
    </footer>
  );
}
