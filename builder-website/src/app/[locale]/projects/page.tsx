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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "zh" ? "住宅项目" : "Residential Projects";
  const description =
    locale === "zh"
      ? "浏览我们在墨尔本的住宅建造项目。"
      : "Explore completed, current and upcoming residential building projects across Melbourne.";
  return {
    title,
    description,
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
      <section className="border-b border-line py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        </Container>
      </section>
      <section className="py-14 sm:py-20">
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
