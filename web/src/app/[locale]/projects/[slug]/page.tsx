import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CATEGORY_LABELS, SITE_URL } from "@/lib/constants";
import { getLocalizedValue } from "@/lib/localization";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { getFallbackProject } from "@/sanity/lib/fallbacks";
import { isSanityConfigured } from "@/sanity/env";
import { safeSanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { PortableTextBlock, ProjectDetail } from "@/sanity/types";
import { BRAND_COPY, getCopy, PROJECT_DETAIL_COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";

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
  const copy = getCopy(PROJECT_DETAIL_COPY, locale);
  const project = await getProject(slug);
  if (!project) return {};
  const title = getLocalizedValue(project.title, locale) ?? project.title.en ?? "";
  const description =
    getLocalizedValue(project.shortDescription, locale) ??
    `${project.suburb}, ${copy.metadataFallbackSuffix}`;

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
  const copy = getCopy(PROJECT_DETAIL_COPY, locale);

  const t = await getTranslations("projects");
  const common = await getTranslations("common");
  const title = getLocalizedValue(project.title, locale) ?? project.title.en ?? "";
  const description = blocksToParagraphs(
    getLocalizedValue(project.description, locale),
  );
  const address =
    project.showFullAddress && project.address
      ? project.address
      : `${project.suburb}, ${BRAND_COPY.stateAbbreviation}`;
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
      <section className="pb-6 pt-8 sm:pb-8 sm:pt-10">
        <Container>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "link" }),
              "gap-2 text-muted no-underline hover:text-brand-red hover:no-underline",
            )}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {copy.back}
          </Link>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <div className="mb-10 grid gap-7 border-t border-line pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="eyebrow">
                {CATEGORY_LABELS[project.projectCategory][locale]} · {statusLabel}
              </p>
              <h1 className="display mt-5 max-w-4xl text-5xl leading-[0.98] sm:text-7xl lg:text-[5.25rem]">{title}</h1>
            </div>
            <div className="lg:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                {common("location")}
              </p>
              <p className="mt-3 text-sm">{address}</p>
              {project.completedYear ? (
                <p className="mt-2 text-sm text-muted">{project.completedYear}</p>
              ) : null}
            </div>
          </div>
          <ProjectVisual
            image={project.coverImage}
            locale={locale}
            title={title}
            location={address}
            imageNumber={1}
            priority
            className="aspect-16/10 sm:aspect-video"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Card className="h-fit rounded-none border-0 bg-stone py-0 ring-0">
            <CardContent className="p-6 sm:p-8">
            <CardTitle className="eyebrow text-charcoal">
              {common("specifications")}
            </CardTitle>
            <dl className="mt-6 divide-y divide-charcoal/12 border-y border-charcoal/12">
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
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-auto w-full justify-between px-5 py-4",
                    )}
                  >
                    {common("listing")} <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
            </CardContent>
          </Card>
          <div className="lg:pt-4">
            {description.length ? (
              description.map((paragraph, index) => (
                <p
                  key={`${paragraph}-${index}`}
                  className="mb-7 text-lg leading-8 text-muted sm:text-xl sm:leading-9"
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
                  <li key={index} className="border-t border-line pt-5 text-sm leading-6">
                    {getLocalizedValue(highlight, locale)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-stone/45 py-16 sm:py-24">
        <Container>
          <ProjectGallery
            images={project.gallery ?? []}
            locale={locale}
            title={title}
            location={address}
          />
        </Container>
      </section>

      <section className="bg-charcoal py-16 text-background sm:py-20">
        <Container className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">{t("related")}</p>
            <h2 className="display mt-4 text-4xl">{t("enquire")}</h2>
          </div>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "border-background bg-background text-charcoal hover:border-brand-red hover:bg-brand-red hover:text-white",
            )}
          >
            {copy.cta}
          </Link>
        </Container>
      </section>
    </>
  );
}
