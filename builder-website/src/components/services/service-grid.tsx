import { ArrowUpRight, Hammer, House, PanelsTopLeft } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { getLocalizedValue } from "@/lib/localization";
import type { Service } from "@/sanity/types";

const icons = [PanelsTopLeft, House, Hammer];

export function ServiceGrid({
  services,
  locale,
}: {
  services: Service[];
  locale: Locale;
}) {
  return (
    <div className="grid border-l border-t border-line md:grid-cols-3">
      {services.map((service, index) => {
        const Icon = icons[index % icons.length];
        const title =
          getLocalizedValue(service.title, locale) ?? service.title.en ?? "";
        const description = getLocalizedValue(service.shortDescription, locale);
        return (
          <article
            key={service._id}
            className="group flex min-h-72 flex-col border-b border-r border-line bg-surface p-7 sm:p-9"
          >
            <Icon className="size-7 text-accent" strokeWidth={1.4} aria-hidden="true" />
            <div className="mt-auto">
              <div className="flex items-start justify-between gap-6">
                <h3 className="display text-2xl leading-tight sm:text-3xl">{title}</h3>
                <ArrowUpRight
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </div>
              {description ? (
                <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
