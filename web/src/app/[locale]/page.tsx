import { ArrowRight, Check, MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ServiceGrid } from "@/components/services/service-grid";
import { fallbackProjects, fallbackServices, fallbackTestimonials } from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import {
  ALL_SERVICES_QUERY,
  FEATURED_PROJECTS_QUERY,
  FEATURED_TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";
import type { ProjectSummary, Service, Testimonial } from "@/sanity/types";
import { getLocalizedValue } from "@/lib/localization";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const projectsT = await getTranslations("projects");

  const [projects, services, testimonials] = await Promise.all([
    safeSanityFetch<ProjectSummary[]>({
      query: FEATURED_PROJECTS_QUERY,
      fallback: fallbackProjects,
    }),
    safeSanityFetch<Service[]>({
      query: ALL_SERVICES_QUERY,
      fallback: fallbackServices,
    }),
    safeSanityFetch<Testimonial[]>({
      query: FEATURED_TESTIMONIALS_QUERY,
      fallback: fallbackTestimonials,
    }),
  ]);

  const process =
    locale === "zh"
      ? [
          ["01", "前期沟通", "明确场地条件、目标、预算框架与可行路径。"],
          ["02", "规划与准备", "协调设计、报价、审批与施工前的关键决策。"],
          ["03", "施工与交付", "以透明沟通管理进度、品质与最终交付。"],
        ]
      : [
          ["01", "Discover", "Clarify the site, priorities, budget framework and a viable path forward."],
          ["02", "Plan", "Coordinate design, pricing, approvals and the decisions required before site work."],
          ["03", "Build", "Manage progress, quality and handover with clear communication throughout."],
        ];

  return (
    <>
      <section className="bg-charcoal text-white">
        <Container className="grid min-h-[calc(100svh-73px)] items-stretch lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center py-16 pr-0 sm:py-24 lg:pr-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9ab83]">
              {t("eyebrow")}
            </p>
            <h1 className="display reveal mt-7 max-w-3xl text-5xl leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
              {t("title")}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/68 sm:text-lg">
              {t("intro")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex min-h-13 items-center justify-center gap-3 bg-background px-6 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-[#d9cbb8]"
              >
                {t("viewProjects")} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-13 items-center justify-center border border-white/30 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-charcoal"
              >
                {t("talk")}
              </Link>
            </div>
          </div>
          <div className="architectural-visual architectural-grid min-h-[52svh] lg:min-h-full">
            <div className="absolute bottom-6 left-6 z-20 bg-charcoal/85 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-white/80">
              Melbourne · Victoria
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading title={t("featured")} intro={t("featuredIntro")} />
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              {t("viewProjects")} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ProjectGrid projects={projects} locale={locale} viewLabel={projectsT("view")} />
        </Container>
      </section>

      <section className="border-y border-line bg-[#eee8dc] py-20 sm:py-28">
        <Container>
          <SectionHeading title={t("services")} intro={t("servicesIntro")} />
          <div className="mt-12">
            <ServiceGrid services={services.slice(0, 3)} locale={locale} />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="min-h-96 bg-[#cbc5b8] p-8 sm:p-12">
            <div className="architectural-grid flex h-full items-end border border-charcoal/15 p-6">
              <p className="max-w-xs text-xs uppercase leading-6 tracking-[0.2em] text-charcoal/70">
                Site-aware design · Practical planning · Detailed construction
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow={t("aboutEyebrow")}
              title={t("aboutTitle")}
              intro={t("aboutBody")}
            />
            <ul className="mt-9 space-y-4 text-sm text-muted">
              {(locale === "zh"
                ? ["一站式项目协调", "清晰透明的沟通", "注重细节与长期品质"]
                : ["Joined-up project coordination", "Clear, direct communication", "Detail and long-term quality"]
              ).map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="size-4 text-accent" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 self-start border-b border-charcoal pb-2 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              {locale === "zh" ? "了解我们" : "About our approach"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-20 text-white sm:py-28">
        <Container>
          <SectionHeading title={t("process")} />
          <div className="mt-14 grid border-l border-t border-white/15 md:grid-cols-3">
            {process.map(([number, title, body]) => (
              <article key={number} className="border-b border-r border-white/15 p-7 sm:p-9">
                <span className="text-xs tracking-[0.2em] text-[#c9ab83]">{number}</span>
                <h3 className="display mt-16 text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/62">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {testimonials.length ? (
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading title={t("testimonials")} />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial._id} className="border border-line bg-surface p-7">
                  <p className="display text-2xl leading-9">
                    “{getLocalizedValue(testimonial.quote, locale)}”
                  </p>
                  <footer className="mt-7 text-xs uppercase tracking-[0.16em] text-muted">
                    {testimonial.clientName}
                    {testimonial.clientLocation ? ` · ${testimonial.clientLocation}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-line py-16">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <MapPin className="mb-4 size-6 text-accent" aria-hidden="true" />
            <h2 className="display text-3xl">{t("areas")}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted">
            {locale === "zh"
              ? "服务墨尔本东区、东南区及大墨尔本地区。具体服务范围请与我们确认。"
              : "Serving Melbourne’s inner east, south east and greater metropolitan area. Contact us to discuss your location."}
          </p>
        </Container>
      </section>

      <section className="bg-accent py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display max-w-3xl text-4xl leading-tight sm:text-6xl">{t("finalTitle")}</h2>
            <p className="mt-5 max-w-2xl text-white/75">{t("finalBody")}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-3 bg-charcoal px-7 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            {t("talk")} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
