import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fallbackSiteSettings } from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/types";
import {
  AU_PHONE_PATTERN,
  CATEGORY_LABELS,
  EMAIL_PATTERN,
  PROJECT_CATEGORIES,
} from "@/lib/constants";
import { BRAND_COPY, CONTACT_PAGE_COPY, getCopy } from "@/lib/copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: getCopy(CONTACT_PAGE_COPY, locale).metadataTitle };
}

const fieldClass =
  "mt-2 min-h-13 w-full rounded-none border-line bg-surface px-4 text-base shadow-none focus-visible:border-secondary focus-visible:ring-secondary/15";
const validatedFieldClass =
  `${fieldClass} user-invalid:border-destructive user-invalid:ring-destructive/15`;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const copy = getCopy(CONTACT_PAGE_COPY, locale);
  const settings = await safeSanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    fallback: fallbackSiteSettings,
  });

  return (
    <>
      <section className="page-intro border-b border-line py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">
              {t("intro")}
            </p>
          </div>
        </Container>
      </section>
      <section className="bg-background py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <form className="grid gap-6 border border-line bg-surface p-6 sm:grid-cols-2 sm:p-9 lg:p-12" aria-describedby="form-notice">
            <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {t("name")}
              <Input className={fieldClass} type="text" name="name" autoComplete="name" />
            </Label>
            <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {t("email")}
              <Input
                className={validatedFieldClass}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                pattern={EMAIL_PATTERN}
                title={t("emailFormat")}
              />
            </Label>
            <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {t("phone")}
              <Input
                className={validatedFieldClass}
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                pattern={AU_PHONE_PATTERN}
                title={t("phoneFormat")}
              />
            </Label>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              <span>{t("language")}</span>
              <Select name="preferredLanguage" defaultValue={locale}>
                <SelectTrigger aria-label={t("language")} className={fieldClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-line ring-0">
                  <SelectItem value="en" className="rounded-none">{t("english")}</SelectItem>
                  <SelectItem value="zh" className="rounded-none">{t("chinese")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              <span>{t("projectType")}</span>
              <Select name="projectType">
                <SelectTrigger aria-label={t("projectType")} className={fieldClass}>
                  <SelectValue placeholder={CONTACT_PAGE_COPY.emptySelect} />
                </SelectTrigger>
                <SelectContent className="rounded-none border-line ring-0">
                  {PROJECT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category} className="rounded-none">
                      {CATEGORY_LABELS[category][locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {t("suburb")}
              <Input className={fieldClass} type="text" name="suburb" />
            </Label>
            <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:col-span-2">
              {t("message")}
              <Textarea className={`${fieldClass} min-h-40 py-3`} name="message" rows={6} />
            </Label>
            <div className="sm:col-span-2">
              <Button
                type="button"
                aria-disabled="true"
                disabled
                size="lg"
              >
                {t("send")}
              </Button>
              <p id="form-notice" className="mt-4 max-w-xl text-sm leading-6 text-muted">
                {t("notice")}
              </p>
              {/* TODO: Connect this form to Resend through a validated Server Action or Route Handler. */}
            </div>
          </form>

          <aside className="flex flex-col justify-between bg-charcoal p-7 text-background sm:p-10">
            <div>
              <p className="eyebrow text-brand-green">{BRAND_COPY.companyName}</p>
              <h2 className="display mt-5 text-4xl">
                {copy.directTitle}
              </h2>
              <div className="mt-8 space-y-5">
                {settings.phone ? (
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 text-sm transition-colors hover:text-brand-green"
                  >
                    <Phone className="size-5 text-brand-teal" aria-hidden="true" />
                    {settings.phone}
                  </a>
                ) : (
                  <p className="flex items-center gap-4 text-sm text-white/45">
                    <Phone className="size-5 text-brand-teal" aria-hidden="true" />
                    {copy.missingPhone}
                  </p>
                )}
                {settings.email ? (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-4 text-sm transition-colors hover:text-brand-green"
                  >
                    <Mail className="size-5 text-brand-teal" aria-hidden="true" />
                    {settings.email}
                  </a>
                ) : (
                  <p className="flex items-center gap-4 text-sm text-white/45">
                    <Mail className="size-5 text-brand-teal" aria-hidden="true" />
                    {copy.missingEmail}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-16 border-t border-white/12 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/45">
              {BRAND_COPY.fullLocation}
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
