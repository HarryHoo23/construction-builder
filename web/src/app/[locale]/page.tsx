import Image from "next/image";
import {
  ArrowRight,
  Compass,
  MapPin,
  MessageSquareText,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ServiceGrid } from "@/components/services/service-grid";
import {
  fallbackProjects,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTestimonials,
} from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import {
  ALL_SERVICES_QUERY,
  FEATURED_PROJECTS_QUERY,
  FEATURED_TESTIMONIALS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  ProjectSummary,
  Service,
  SiteSettings,
  Testimonial,
} from "@/sanity/types";
import { getLocalizedValue } from "@/lib/localization";
import { BRAND_COPY, getCopy, HOME_COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const projectsT = await getTranslations("projects");

  const [projects, services, testimonials, settings] = await Promise.all([
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
    safeSanityFetch<SiteSettings>({
      query: SITE_SETTINGS_QUERY,
      fallback: fallbackSiteSettings,
    }),
  ]);
  const displayServices = services.length ? services : fallbackServices;
  const copy = getCopy(HOME_COPY, locale);
  const serviceAreas =
    settings.serviceAreas
      ?.map((area) => getLocalizedValue(area, locale))
      .filter((area): area is string => Boolean(area)) ?? [];

  const whyIcons = [Ruler, MessageSquareText, ShieldCheck, Compass];

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal">
        <div className="relative hidden h-[clamp(520px,64svh,660px)] w-full overflow-hidden md:block">
          <Image
            src="/images/hongwei-hero-clean.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/25 to-transparent" />
          <Container className="relative z-10 flex h-full items-center text-background">
            <div className="max-w-2xl pb-4">
              <p className="display text-6xl leading-none tracking-[0.06em] lg:text-[5.6rem]">
                {BRAND_COPY.wordmark}
              </p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.42em] text-white/82 lg:text-base">
                {BRAND_COPY.descriptor}
              </p>
              <span className="mt-9 block h-px w-14 bg-brand-red" />
              <h1 className="display mt-9 text-5xl leading-[1.03] lg:text-[4.5rem]">
                {t("title")}
              </h1>
            </div>
          </Container>
        </div>
        <div className="relative flex h-[580px] items-end overflow-hidden px-6 pb-12 pt-20 text-background sm:h-[620px] md:hidden">
          <Image
            src="/images/hongwei-hero-clean.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
          <div className="relative z-10">
            <p className="display text-3xl tracking-[0.14em]">{BRAND_COPY.wordmark}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.42em] text-white/75">
              {BRAND_COPY.descriptor}
            </p>
            <span className="mt-8 block h-px w-12 bg-brand-red" />
            <p className="display mt-7 max-w-sm text-5xl leading-[1.02]">{t("title")}</p>
          </div>
        </div>
        <Container className="flex flex-col gap-4 border-t border-white/10 py-5 text-background sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">
            {t("eyebrow")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-charcoal",
              )}
            >
              {t("viewProjects")} <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants(),
                "bg-background text-charcoal hover:bg-brand-red hover:text-white",
              )}
            >
              {t("talk")} <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="bg-background py-20 sm:py-28">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={copy.projectPortfolioEyebrow}
              title={t("featured")}
              intro={t("featuredIntro")}
            />
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "link" }),
                "gap-2 border-b border-charcoal/35 text-foreground no-underline hover:border-brand-red hover:text-brand-red hover:bg-accent hover:no-underline",
              )}
            >
              {t("viewProjects")} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ProjectGrid projects={projects} locale={locale} viewLabel={projectsT("view")} />
        </Container>
      </section>

      {/* Services */}
      <section className="brand-tint border-y border-line py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={copy.servicesEyebrow}
            title={t("services")}
            intro={t("servicesIntro")}
          />
          <div className="mt-12">
            <ServiceGrid services={displayServices.slice(0, 3)} locale={locale} />
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="bg-background py-20 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow={t("whyEyebrow")}
              title={t("whyTitle")}
              intro={t("whyIntro")}
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {copy.whyChooseUs.map(({ title, body }, index) => {
                const Icon = whyIcons[index];
                return (
                  <Card key={title} className="rounded-none border-0 py-0 ring-0">
                    <CardContent className="p-7 sm:p-9">
                      <Icon className="size-6 text-brand-teal" strokeWidth={1.35} aria-hidden="true" />
                      <p className="mt-12 text-[10px] tracking-[0.2em] text-taupe">0{index + 1}</p>
                      <CardTitle className="display mt-4 text-3xl font-normal">{title}</CardTitle>
                      <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Development Types */}
      <section className="border-y border-line bg-stone/55 py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <SectionHeading
              eyebrow={t("developmentEyebrow")}
              title={t("developmentTitle")}
              intro={t("developmentIntro")}
            />
            <div className="border-t border-charcoal/25">
              {copy.developmentTypes.map(({ number, title, body }, index) => (
                <article
                  key={title}
                  className="group grid gap-5 border-b border-charcoal/18 py-7 sm:grid-cols-[56px_0.75fr_1.25fr] sm:items-start"
                >
                  <span
                    className={`text-[10px] font-semibold tracking-[0.18em] ${
                      index % 2 ? "text-brand-teal" : "text-brand-red"
                    }`}
                  >
                    {number}
                  </span>
                  <h3 className="display text-2xl sm:text-3xl">{title}</h3>
                  <p className="text-sm leading-7 text-muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Our Process */}
      <section className="process-section bg-charcoal py-20 text-background sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={copy.processEyebrow}
            title={t("process")}
          />
          <div className="mt-14 grid border-l border-t border-white/15 md:grid-cols-3">
            {copy.process.map(({ number, title, body }) => (
              <article key={number} className="border-b border-r border-white/15 p-7 sm:p-9">
                <span className="text-xs font-semibold tracking-[0.2em] text-brand-green">{number}</span>
                <h3 className="display mt-16 text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={copy.testimonialsEyebrow}
            title={t("testimonials")}
            intro={t("testimonialsIntro")}
          />
          {testimonials.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial._id}
                  className="rounded-none border border-line py-0 shadow-card ring-0"
                >
                  <CardContent className="p-7 sm:p-9">
                    <blockquote>
                      <span className="display text-5xl leading-none text-brand-red/55">“</span>
                      <p className="display mt-3 text-2xl leading-9">
                        {getLocalizedValue(testimonial.quote, locale)}
                      </p>
                      <footer className="mt-8 border-t border-line pt-5 text-[10px] uppercase tracking-[0.16em] text-muted">
                        {testimonial.clientName}
                        {testimonial.clientLocation ? ` · ${testimonial.clientLocation}` : ""}
                      </footer>
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-12 border-y border-line py-10">
              <p className="display max-w-4xl text-3xl leading-tight text-charcoal/78 sm:text-5xl">
                {copy.emptyTestimonials}
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Service Areas */}
      <section className="border-t border-line bg-stone/55 py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <MapPin className="mb-5 size-6 text-brand-teal" strokeWidth={1.4} aria-hidden="true" />
            <p className="eyebrow">{copy.serviceAreasEyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">{t("areas")}</h2>
          </div>
          <div>
            <p className="max-w-2xl text-sm leading-7 text-muted">
              {copy.serviceAreasBody}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {(serviceAreas.length
                ? serviceAreas
                : copy.defaultServiceAreas
              ).map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="rounded-none border-charcoal/18 bg-background px-4 py-3 text-xs uppercase tracking-[0.14em] text-charcoal/70"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final Contact CTA */}
      <section className="cta-section border-t border-line py-20 sm:py-24">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">{copy.finalCtaEyebrow}</p>
            <h2 className="display mt-5 max-w-4xl text-5xl leading-[1.02] sm:text-7xl">
              {t("finalTitle")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{t("finalBody")}</p>
          </div>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "shrink-0")}
          >
            {t("talk")} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
