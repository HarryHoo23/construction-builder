import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { ServiceGrid } from "@/components/services/service-grid";
import { fallbackServices } from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import { ALL_SERVICES_QUERY } from "@/sanity/lib/queries";
import type { Service } from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "住宅建造服务" : "Residential Building Services",
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const services = await safeSanityFetch<Service[]>({
    query: ALL_SERVICES_QUERY,
    fallback: fallbackServices,
  });

  return (
    <>
      <section className="border-b border-line py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        </Container>
      </section>
      <section className="py-16 sm:py-24">
        <Container>
          {services.length ? (
            <ServiceGrid services={services} locale={locale} />
          ) : (
            <EmptyState title={t("emptyTitle")} body={t("emptyBody")} />
          )}
        </Container>
      </section>
    </>
  );
}
