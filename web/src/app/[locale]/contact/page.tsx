import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { fallbackSiteSettings } from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/types";
import { PROJECT_CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "zh" ? "联系我们" : "Contact" };
}

const fieldClass =
  "mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base focus:border-accent";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const settings = await safeSanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    fallback: fallbackSiteSettings,
  });

  return (
    <>
      <section className="border-b border-line py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        </Container>
      </section>
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <form className="grid gap-6 sm:grid-cols-2" aria-describedby="form-notice">
            <label className="text-sm">
              {t("name")}
              <input className={fieldClass} type="text" name="name" autoComplete="name" />
            </label>
            <label className="text-sm">
              {t("email")}
              <input className={fieldClass} type="email" name="email" autoComplete="email" />
            </label>
            <label className="text-sm">
              {t("phone")}
              <input className={fieldClass} type="tel" name="phone" autoComplete="tel" />
            </label>
            <label className="text-sm">
              {t("language")}
              <select className={fieldClass} name="preferredLanguage" defaultValue={locale}>
                <option value="en">{t("english")}</option>
                <option value="zh">{t("chinese")}</option>
              </select>
            </label>
            <label className="text-sm">
              {t("projectType")}
              <select className={fieldClass} name="projectType" defaultValue="">
                <option value="" disabled>—</option>
                {PROJECT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_LABELS[category][locale]}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              {t("suburb")}
              <input className={fieldClass} type="text" name="suburb" />
            </label>
            <label className="text-sm sm:col-span-2">
              {t("message")}
              <textarea className={`${fieldClass} min-h-40 py-3`} name="message" rows={6} />
            </label>
            <div className="sm:col-span-2">
              <button
                type="button"
                aria-disabled="true"
                className="inline-flex min-h-13 cursor-not-allowed items-center bg-charcoal px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white opacity-65"
              >
                {t("send")}
              </button>
              <p id="form-notice" className="mt-4 max-w-xl text-sm leading-6 text-muted">
                {t("notice")}
              </p>
              {/* TODO: Connect this form to Resend through a validated Server Action or Route Handler. */}
            </div>
          </form>

          <aside className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h2 className="display text-3xl">
              {locale === "zh" ? "直接联系" : "Contact directly"}
            </h2>
            <div className="mt-8 space-y-5">
              {settings.phone ? (
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 text-sm"
                >
                  <Phone className="size-5 text-accent" aria-hidden="true" />
                  {settings.phone}
                </a>
              ) : (
                <p className="flex items-center gap-4 text-sm text-muted">
                  <Phone className="size-5 text-accent" aria-hidden="true" />
                  {locale === "zh" ? "在网站设置中添加电话" : "Add phone in Site Settings"}
                </p>
              )}
              {settings.email ? (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-4 text-sm">
                  <Mail className="size-5 text-accent" aria-hidden="true" />
                  {settings.email}
                </a>
              ) : (
                <p className="flex items-center gap-4 text-sm text-muted">
                  <Mail className="size-5 text-accent" aria-hidden="true" />
                  {locale === "zh" ? "在网站设置中添加邮箱" : "Add email in Site Settings"}
                </p>
              )}
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
