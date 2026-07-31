import { ArrowUpRight, Hammer, House, PanelsTopLeft } from "lucide-react";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/routing";
import { getLocalizedValue } from "@/lib/localization";
import type { Service } from "@/sanity/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const icons = [PanelsTopLeft, House, Hammer];

export function ServiceGrid({
  services,
  locale,
  animate = false,
}: {
  services: Service[];
  locale: Locale;
  animate?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => {
        const Icon = icons[index % icons.length];
        const title =
          getLocalizedValue(service.title, locale) ?? service.title.en ?? "";
        const description = getLocalizedValue(service.shortDescription, locale);
        return (
          <Card
            key={service._id}
            data-home-reveal={animate ? "card" : undefined}
            style={
              animate
                ? ({
                    "--reveal-delay": `${Math.min(index, 5) * 80}ms`,
                  } as CSSProperties)
                : undefined
            }
            className="group relative min-h-72 overflow-hidden rounded-none border border-line py-0 shadow-card ring-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-muted hover:shadow-card-hover sm:min-h-80"
          >
            <span className="absolute inset-y-0 left-0 w-0.5 bg-brand-green opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="flex min-h-72 min-w-0 flex-col p-6 sm:min-h-80 sm:p-8 lg:p-9">
              <span className="grid size-12 place-items-center rounded-full border border-line bg-background">
                <Icon className="size-5 text-brand-teal" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <div className="mt-auto">
                <div className="flex min-w-0 items-start justify-between gap-4 sm:gap-6">
                  <CardTitle className="display min-w-0 break-words text-2xl font-normal leading-tight sm:text-3xl">{title}</CardTitle>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-charcoal/50 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-red"
                    aria-hidden="true"
                  />
                </div>
                {description ? (
                  <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
