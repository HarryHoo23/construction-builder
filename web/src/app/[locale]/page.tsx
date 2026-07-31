import Image from "next/image";
import type { CSSProperties } from "react";
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
import { HomeMotion } from "@/components/home/home-motion";
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
      <HomeMotion />
      {/* Hero */}
      <section className="bg-charcoal" data-home-hero>
        <div className="relative hidden h-[clamp(520px,64svh,660px)] w-full overflow-hidden md:block">
          <Image
            src="/images/hongwei-hero-clean.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="home-hero-media object-cover object-[center_20%]"
            data-home-parallax
          />
          <div className="home-hero-overlay absolute inset-0 bg-gradient-to-r from-black/72 via-black/25 to-transparent" />
          <Container className="relative z-10 flex h-full items-center text-background">
            <div className="max-w-2xl pb-4">
              <p className="home-hero-intro display text-6xl leading-none tracking-[0.06em] lg:text-[5.6rem]">
                {BRAND_COPY.wordmark}
              </p>
              <p
                className="home-hero-intro mt-4 text-sm font-medium uppercase tracking-[0.42em] text-white/82 lg:text-base"
                style={{ "--hero-delay": "260ms" } as CSSProperties}
              >
                {BRAND_COPY.descriptor}
              </p>
              <span
                className="home-hero-intro mt-9 block h-px w-14 bg-brand-red"
                style={{ "--hero-delay": "340ms" } as CSSProperties}
              />
              <h1
                className="home-hero-intro display mt-9 text-5xl leading-[1.03] lg:text-[4.5rem]"
                style={{ "--hero-delay": "400ms" } as CSSProperties}
              >
                {t("title")}
              </h1>
            </div>
          </Container>
        </div>
        <div className="mobile-hero relative flex h-[580px] items-end overflow-hidden px-5 pb-12 pt-20 text-background sm:h-[620px] sm:px-8 md:hidden">
          <Image
            src="/images/hongwei-hero-clean.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="home-hero-media object-cover object-[72%_center]"
            data-home-parallax
          />
          <div className="home-hero-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
          <div className="relative z-10">
            <p className="home-hero-intro mobile-hero-brand display text-3xl tracking-[0.14em]">{BRAND_COPY.wordmark}</p>
            <p
              className="home-hero-intro mt-2 text-[10px] uppercase tracking-[0.42em] text-white/75"
              style={{ "--hero-delay": "260ms" } as CSSProperties}
            >
              {BRAND_COPY.descriptor}
            </p>
            <span
              className="home-hero-intro mobile-hero-divider mt-8 block h-px w-12 bg-brand-red"
              style={{ "--hero-delay": "340ms" } as CSSProperties}
            />
            <h1
              className="home-hero-intro mobile-hero-title display mt-7 max-w-sm text-5xl leading-[1.02]"
              style={{ "--hero-delay": "400ms" } as CSSProperties}
            >
              {t("title")}
            </h1>
          </div>
        </div>
        <Container
          data-home-reveal="fade"
          className="flex flex-col gap-4 border-t border-white/10 py-5 text-background sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">
            {t("eyebrow")}
          </p>
          <div className="grid w-full gap-3 min-[390px]:grid-cols-2 sm:flex sm:w-auto sm:flex-wrap">
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-charcoal sm:w-auto",
              )}
            >
              {t("viewProjects")} <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants(),
                "w-full bg-background text-charcoal hover:bg-brand-red hover:text-white sm:w-auto",
              )}
            >
              {t("talk")} <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="bg-background py-16 sm:py-28">
        <Container>
          <div data-home-reveal className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
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
          <ProjectGrid projects={projects} locale={locale} viewLabel={projectsT("view")} animate />
        </Container>
      </section>

      {/* Services */}
      <section className="brand-tint border-y border-line py-16 sm:py-28">
        <Container>
          <div data-home-reveal>
            <SectionHeading
              eyebrow={copy.servicesEyebrow}
              title={t("services")}
              intro={t("servicesIntro")}
            />
          </div>
          <div className="mt-12">
            <ServiceGrid services={displayServices.slice(0, 3)} locale={locale} animate />
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="bg-background py-16 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div data-home-reveal className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow={t("whyEyebrow")}
                title={t("whyTitle")}
                intro={t("whyIntro")}
              />
            </div>
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {copy.whyChooseUs.map(({ title, body }, index) => {
                const Icon = whyIcons[index];
                return (
                  <Card
                    key={title}
                    data-home-reveal="card"
                    style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                    className="rounded-none border-0 py-0 ring-0"
                  >
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
      <section className="border-y border-line bg-stone/55 py-16 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div data-home-reveal>
              <SectionHeading
                eyebrow={t("developmentEyebrow")}
                title={t("developmentTitle")}
                intro={t("developmentIntro")}
              />
            </div>
            <div className="border-t border-charcoal/25">
              {copy.developmentTypes.map(({ number, title, body }, index) => (
                <article
                  key={title}
                  data-home-reveal
                  style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
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
      <section className="process-section bg-charcoal py-16 text-background sm:py-28">
        <Container>
          <div data-home-reveal>
            <SectionHeading
              eyebrow={copy.processEyebrow}
              title={t("process")}
            />
          </div>
          <div className="mt-14 grid border-l border-t border-white/15 md:grid-cols-3">
            {copy.process.map(({ number, title, body }, index) => (
              <article
                key={number}
                data-home-reveal="card"
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                className="border-b border-r border-white/15 p-7 sm:p-9"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-brand-green">{number}</span>
                <h3 className="display mt-16 text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-16 sm:py-28">
        <Container>
          <div data-home-reveal>
            <SectionHeading
              eyebrow={copy.testimonialsEyebrow}
              title={t("testimonials")}
              intro={t("testimonialsIntro")}
            />
          </div>
          {testimonials.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial._id}
                  data-home-reveal="card"
                  style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
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
            <div data-home-reveal className="mt-12 border-y border-line py-10">
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
          <div data-home-reveal>
            <MapPin className="mb-5 size-6 text-brand-teal" strokeWidth={1.4} aria-hidden="true" />
            <p className="eyebrow">{copy.serviceAreasEyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">{t("areas")}</h2>
          </div>
          <div data-home-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
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
      <section className="cta-section border-t border-line py-16 sm:py-24">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div data-home-reveal>
            <p className="eyebrow">{copy.finalCtaEyebrow}</p>
            <h2 className="display mt-5 max-w-4xl break-words text-5xl leading-[1.02] sm:text-7xl">
              {t("finalTitle")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{t("finalBody")}</p>
          </div>
          <Link
            href="/contact"
            data-home-reveal
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
            className={cn(buttonVariants({ size: "lg" }), "w-full shrink-0 sm:w-auto")}
          >
            {t("talk")} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
