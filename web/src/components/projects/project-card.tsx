import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CATEGORY_LABELS } from "@/lib/constants";
import { getLocalizedValue } from "@/lib/localization";
import type { ProjectSummary } from "@/sanity/types";
import { ProjectVisual } from "./project-visual";
import { BRAND_COPY, PROJECT_STATUS_COPY } from "@/lib/copy";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function statusLabel(status: ProjectSummary["status"], locale: Locale) {
  return PROJECT_STATUS_COPY[status][locale];
}

export function ProjectCard({
  project,
  locale,
  viewLabel,
  revealIndex,
}: {
  project: ProjectSummary;
  locale: Locale;
  viewLabel: string;
  revealIndex?: number;
}) {
  const title = getLocalizedValue(project.title, locale) ?? project.title.en ?? "";
  const category = CATEGORY_LABELS[project.projectCategory][locale];
  const location =
    project.showFullAddress && project.address
      ? project.address
      : `${project.suburb}, ${BRAND_COPY.stateAbbreviation}`;

  return (
    <Card
      data-home-reveal={revealIndex === undefined ? undefined : "card"}
      style={
        revealIndex === undefined
          ? undefined
          : ({
              "--reveal-delay": `${Math.min(revealIndex, 5) * 80}ms`,
            } as CSSProperties)
      }
      className="group gap-0 overflow-hidden rounded-none border border-line py-0 shadow-card ring-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-muted hover:shadow-card-hover"
    >
      <Link href={`/projects/${project.slug}`} className="block min-w-0">
        <ProjectVisual
          image={project.coverImage}
          locale={locale}
          title={title}
          location={location}
          imageNumber={1}
          className="aspect-project grayscale-[0.08]"
        />
        <CardContent className="bg-card p-5 sm:p-6">
          <div className="flex min-w-0 items-start justify-between gap-4 sm:gap-5">
            <div className="min-w-0">
              <Badge variant="outline" className="h-auto max-w-full whitespace-normal rounded-none border-primary/30 bg-primary/5 py-1.5 text-left text-[10px] leading-4 uppercase tracking-[0.12em] text-primary sm:tracking-[0.14em]">
                {category} · {statusLabel(project.status, locale)}
              </Badge>
              <CardTitle className="display mt-3 break-words text-[1.75rem] font-normal leading-tight">{title}</CardTitle>
              <CardDescription className="mt-2 break-words text-sm leading-6 text-muted">
                {location}
                {project.completedYear ? ` · ${project.completedYear}` : ""}
              </CardDescription>
            </div>
            <ArrowUpRight
              className="mt-1 size-5 shrink-0 text-charcoal/55 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-red"
              aria-hidden="true"
            />
          </div>
          <span className="sr-only">{viewLabel}</span>
        </CardContent>
      </Link>
    </Card>
  );
}
