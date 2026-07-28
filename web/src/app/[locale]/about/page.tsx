import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ABOUT_PAGE_COPY, getCopy } from "@/lib/copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: getCopy(ABOUT_PAGE_COPY, locale).metadataTitle };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const copy = getCopy(ABOUT_PAGE_COPY, locale);

  const principles = [
    [t("principle1"), t("principle1Body")],
    [t("principle2"), t("principle2Body")],
    [t("principle3"), t("principle3Body")],
  ];

  return (
    <>
      <section className="page-intro py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        </Container>
      </section>
      <section>
        <Container className="grid min-h-[520px] lg:grid-cols-2">
          <div className="architectural-visual min-h-96" />
          <div className="flex flex-col justify-center bg-charcoal p-8 text-white sm:p-14">
            <p className="eyebrow text-brand-green">
              {copy.visualEyebrow}
            </p>
            <p className="display mt-8 max-w-xl text-3xl leading-tight sm:text-5xl">
              {copy.visualStatement}
            </p>
          </div>
        </Container>
      </section>
      <section className="bg-background py-20 sm:py-28">
        <Container>
          <SectionHeading title={t("principles")} />
          <div className="mt-12 grid border-l border-t border-line md:grid-cols-3">
            {principles.map(([title, body], index) => (
              <article key={title} className="border-b border-r border-line bg-surface p-8">
                <span className="text-xs tracking-[0.18em] text-brand-teal">0{index + 1}</span>
                <h2 className="display mt-14 text-3xl">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
              </article>
            ))}
          </div>
          <Link
            href="/contact"
            className="brand-button mt-12 inline-flex min-h-13 items-center gap-3 border border-charcoal px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            {copy.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
