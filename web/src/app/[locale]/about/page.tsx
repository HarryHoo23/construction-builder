import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "zh" ? "关于我们" : "About" };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const principles = [
    [t("principle1"), t("principle1Body")],
    [t("principle2"), t("principle2Body")],
    [t("principle3"), t("principle3Body")],
  ];

  return (
    <>
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        </Container>
      </section>
      <section>
        <Container className="grid min-h-[520px] lg:grid-cols-2">
          <div className="architectural-visual min-h-96" />
          <div className="flex flex-col justify-center bg-charcoal p-8 text-white sm:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9ab83]">
              {locale === "zh" ? "住宅 · 场地 · 生活" : "Homes · Sites · People"}
            </p>
            <p className="display mt-8 max-w-xl text-3xl leading-tight sm:text-5xl">
              {locale === "zh"
                ? "好的建造不仅关乎成品，也关乎抵达成品的每一步。"
                : "A good build is as much about the path to the finished home as the home itself."}
            </p>
          </div>
        </Container>
      </section>
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading title={t("principles")} />
          <div className="mt-12 grid border-l border-t border-line md:grid-cols-3">
            {principles.map(([title, body], index) => (
              <article key={title} className="border-b border-r border-line bg-surface p-8">
                <span className="text-xs tracking-[0.18em] text-accent">0{index + 1}</span>
                <h2 className="display mt-14 text-3xl">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
              </article>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-12 inline-flex min-h-13 items-center gap-3 bg-charcoal px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            {locale === "zh" ? "与我们聊聊" : "Discuss your project"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
