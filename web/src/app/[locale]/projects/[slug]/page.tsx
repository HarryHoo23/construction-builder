import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CATEGORY_LABELS, SITE_URL } from "@/lib/constants";
import { getLocalizedValue } from "@/lib/localization";
import { Container } from "@/components/ui/container";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { getFallbackProject } from "@/sanity/lib/fallbacks";
import { isSanityConfigured } from "@/sanity/env";
import { safeSanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { PortableTextBlock, ProjectDetail } from "@/sanity/types";

function blocksToParagraphs(blocks: PortableTextBlock[] | undefined) {
  return (
    blocks?.map((block) =>
      block.children?.map((child) => child.text ?? "").join(""),
    ).filter(Boolean) ?? []
  );
}

async function getProject(slug: string) {
  return safeSanityFetch<ProjectDetail | null>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    fallback: isSanityConfigured ? null : getFallbackProject(slug),
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const title = getLocalizedValue(project.title, locale) ?? project.title.en ?? "";
  const description =
    getLocalizedValue(project.shortDescription, locale) ??
    `${project.suburb}, VIC residential building project.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects/${slug}`,
      languages: {
        en: `${SITE_URL}/en/projects/${slug}`,
        "zh-CN": `${SITE_URL}/zh/projects/${slug}`,
      },
    },
    openGraph: { title, description, type: "article" },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = await getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const common = await getTranslations("common");
  const title = getLocalizedValue(project.title, locale) ?? project.title.en ?? "";
  const description = blocksToParagraphs(
    getLocalizedValue(project.description, locale),
  );
  const address =
    project.showFullAddress && project.address
      ? project.address
      : `${project.suburb}, VIC`;
  const specifications = [
    [common("bedrooms"), project.bedrooms],
    [common("bathrooms"), project.bathrooms],
    [common("carSpaces"), project.carSpaces],
    [common("dwellings"), project.numberOfDwellings],
    [common("siteArea"), project.siteArea ? `${project.siteArea} m²` : null],
  ].filter((item) => item[1] !== null && item[1] !== undefined);
  const statusLabel =
    project.status === "completed"
      ? common("completed")
      : project.status === "under-construction"
        ? common("underConstruction")
        : common("comingSoon");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    locationCreated: address,
    inLanguage: locale === "zh" ? "zh-CN" : "en-AU",
    url: `${SITE_URL}/${locale}/projects/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-8 sm:py-12">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {locale === "zh" ? "返回项目" : "Back to projects"}
          </Link>
        </Container>
      </section>
      <section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="pb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {CATEGORY_LABELS[project.projectCategory][locale]} · {statusLabel}
            </p>
            <h1 className="display mt-5 text-5xl leading-[1] sm:text-7xl">{title}</h1>
            <p className="mt-6 text-sm uppercase tracking-[0.16em] text-muted">{address}</p>
          </div>
          <ProjectVisual
            image={project.coverImage}
            locale={locale}
            title={title}
            priority
            className="aspect-[5/4]"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <aside>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">
              {common("specifications")}
            </h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {specifications.map(([label, value]) => (
                <div key={String(label)} className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            {project.realEstateUrl || project.domainUrl ? (
              <div className="mt-8 space-y-3">
                {[project.realEstateUrl, project.domainUrl].filter(Boolean).map((url) => (
                  <a
                    key={url}
                    href={url ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between border border-line bg-surface px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em]"
                  >
                    {common("listing")} <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </aside>
          <div>
            {description.length ? (
              description.map((paragraph, index) => (
                <p
                  key={`${paragraph}-${index}`}
                  className="mb-6 text-lg leading-8 text-muted sm:text-xl sm:leading-9"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-lg leading-8 text-muted">
                {getLocalizedValue(project.shortDescription, locale)}
              </p>
            )}
            {project.designHighlights?.length ? (
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {project.designHighlights.map((highlight, index) => (
                  <li key={index} className="border-t border-line pt-4 text-sm">
                    {getLocalizedValue(highlight, locale)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <ProjectGallery
            images={project.gallery ?? []}
            locale={locale}
            title={title}
          />
        </Container>
      </section>

      <section className="bg-charcoal py-16 text-white">
        <Container className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">{t("related")}</p>
            <h2 className="display mt-4 text-4xl">{t("enquire")}</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-13 items-center justify-center bg-background px-7 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal"
          >
            {locale === "zh" ? "联系我们" : "Start a conversation"}
          </Link>
        </Container>
      </section>
    </>
  );
}
