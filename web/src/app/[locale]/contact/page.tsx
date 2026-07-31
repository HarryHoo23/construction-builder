import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { fallbackSiteSettings } from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/types";
import { TURNSTILE_TEST_SITE_KEY } from "@/lib/constants";
import { BRAND_COPY, CONTACT_PAGE_COPY, getCopy } from "@/lib/copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: getCopy(CONTACT_PAGE_COPY, locale).metadataTitle };
}

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
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
    (process.env.NODE_ENV === "development"
      ? TURNSTILE_TEST_SITE_KEY
      : "");

  return (
    <>
      <section className="page-intro border-b border-line py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">
              {t("intro")}
            </p>
          </div>
        </Container>
      </section>
      <section className="bg-background py-12 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <ContactForm
            locale={locale}
            turnstileSiteKey={turnstileSiteKey}
            labels={{
              name: t("name"),
              email: t("email"),
              emailFormat: t("emailFormat"),
              phone: t("phone"),
              phoneFormat: t("phoneFormat"),
              language: t("language"),
              projectType: t("projectType"),
              suburb: t("suburb"),
              message: t("message"),
              english: t("english"),
              chinese: t("chinese"),
              emptySelect: CONTACT_PAGE_COPY.emptySelect,
              send: t("send"),
              sending: t("sending"),
              notice: t("notice"),
              success: t("success"),
              validationError: t("validationError"),
              turnstileError: t("turnstileError"),
              rateLimitError: t("rateLimitError"),
              sendError: t("sendError"),
              configurationError: t("configurationError"),
              nameError: t("nameError"),
              emailError: t("emailError"),
              phoneError: t("phoneError"),
              projectTypeError: t("projectTypeError"),
              suburbError: t("suburbError"),
              messageError: t("messageError"),
            }}
          />

          <aside className="flex min-w-0 flex-col justify-between bg-charcoal p-6 text-background sm:p-10">
            <div>
              <p className="eyebrow text-brand-green">{BRAND_COPY.companyName}</p>
              <h2 className="display mt-5 text-4xl">
                {copy.directTitle}
              </h2>
              <div className="mt-8 space-y-5">
                {settings.phone ? (
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="flex min-w-0 items-center gap-4 text-sm transition-colors hover:text-brand-green"
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
                    className="flex min-w-0 items-center gap-4 break-all text-sm transition-colors hover:text-brand-green"
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
