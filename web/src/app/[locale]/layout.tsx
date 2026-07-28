import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getLocalizedValue } from "@/lib/localization";
import { SITE_URL } from "@/lib/constants";
import { fallbackSiteSettings } from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/types";
import { createContractorJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale: Locale = requested === "zh" ? "zh" : "en";
  const title =
    locale === "zh" ? "墨尔本住宅建造" : "Melbourne Residential Builder";
  const description =
    locale === "zh"
      ? "墨尔本双拼住宅、联排别墅、定制住宅与翻新扩建服务。"
      : "Considered residential construction, dual occupancy and custom homes across Melbourne.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        "zh-CN": `${SITE_URL}/zh`,
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "zh" ? "zh_CN" : "en_AU",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale = requested as Locale;
  setRequestLocale(locale);

  const [messages, nav, footer, settings] = await Promise.all([
    getMessages(),
    getTranslations("nav"),
    getTranslations("footer"),
    safeSanityFetch<SiteSettings>({
      query: SITE_SETTINGS_QUERY,
      fallback: fallbackSiteSettings,
    }),
  ]);

  const companyName =
    getLocalizedValue(settings.companyName, locale) ??
    getLocalizedValue(fallbackSiteSettings.companyName, locale) ??
    "Melbourne Residential Builder";
  const serviceAreas =
    settings.serviceAreas
      ?.map((area) => getLocalizedValue(area, locale))
      .filter((area): area is string => Boolean(area)) ?? [];

  const navLabels = {
    home: nav("home"),
    projects: nav("projects"),
    services: nav("services"),
    about: nav("about"),
    contact: nav("contact"),
    cta: nav("cta"),
    menu: nav("menu"),
    close: nav("close"),
  };
  const contractorJsonLd = createContractorJsonLd(settings, locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={locale === "zh" ? "zh-CN" : "en-AU"} className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contractorJsonLd) }}
        />
        <Header locale={locale} labels={navLabels} companyName={companyName} />
        <main className="flex-1">{children}</main>
        <Footer
          locale={locale}
          companyName={companyName}
          email={settings.email ?? undefined}
          phone={settings.phone ?? undefined}
          serviceAreas={serviceAreas}
          licence={settings.builderLicenceNumber ?? undefined}
          abn={settings.abn ?? undefined}
          labels={{
            description:
              getLocalizedValue(settings.companyDescription, locale) ??
              footer("description"),
            contact: footer("contact"),
            navigate: footer("navigate"),
            serviceAreas: footer("serviceAreas"),
            rights: footer("rights"),
            home: navLabels.home,
            projects: navLabels.projects,
            services: navLabels.services,
            about: navLabels.about,
            contactPage: navLabels.contact,
          }}
        />
      </div>
    </NextIntlClientProvider>
  );
}
