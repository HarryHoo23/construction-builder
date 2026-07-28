import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectFilters } from "@/components/projects/project-filters";
import { fallbackProjects } from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { ProjectSummary } from "@/sanity/types";
import { getCopy, PAGE_METADATA_COPY } from "@/lib/copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCopy(PAGE_METADATA_COPY.projects, locale);
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects`,
      languages: {
        en: `${SITE_URL}/en/projects`,
        "zh-CN": `${SITE_URL}/zh/projects`,
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const projects = await safeSanityFetch<ProjectSummary[]>({
    query: ALL_PROJECTS_QUERY,
    fallback: fallbackProjects,
  });

  return (
    <>
      <section className="page-intro border-b border-line py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">
              {t("intro")}
            </p>
          </div>
        </Container>
      </section>
      <section className="bg-background py-14 sm:py-20">
        <Container>
          <ProjectFilters
            projects={projects}
            locale={locale}
            labels={{
              category: t("category"),
              status: t("status"),
              all: t("all"),
              view: t("view"),
              emptyTitle: t("emptyTitle"),
              emptyBody: t("emptyBody"),
            }}
          />
        </Container>
      </section>
    </>
  );
}
