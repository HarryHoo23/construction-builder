import { ArrowUpRight, Hammer, House, PanelsTopLeft } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { getLocalizedValue } from "@/lib/localization";
import type { Service } from "@/sanity/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const icons = [PanelsTopLeft, House, Hammer];

export function ServiceGrid({
  services,
  locale,
}: {
  services: Service[];
  locale: Locale;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {services.map((service, index) => {
        const Icon = icons[index % icons.length];
        const title =
          getLocalizedValue(service.title, locale) ?? service.title.en ?? "";
        const description = getLocalizedValue(service.shortDescription, locale);
        return (
          <Card
            key={service._id}
            className="group relative min-h-80 overflow-hidden rounded-none border border-line py-0 shadow-card ring-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-muted hover:shadow-card-hover"
          >
            <span className="absolute inset-y-0 left-0 w-0.5 bg-brand-green opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="flex min-h-80 flex-col p-7 sm:p-9">
              <span className="grid size-12 place-items-center rounded-full border border-line bg-background">
                <Icon className="size-5 text-brand-teal" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <div className="mt-auto">
                <div className="flex items-start justify-between gap-6">
                  <CardTitle className="display text-2xl font-normal leading-tight sm:text-3xl">{title}</CardTitle>
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
