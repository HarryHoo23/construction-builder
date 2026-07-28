import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CATEGORY_LABELS } from "@/lib/constants";
import { getLocalizedValue } from "@/lib/localization";
import type { ProjectSummary } from "@/sanity/types";
import { ProjectVisual } from "./project-visual";
import { BRAND_COPY, PROJECT_STATUS_COPY } from "@/lib/copy";

function statusLabel(status: ProjectSummary["status"], locale: Locale) {
  return PROJECT_STATUS_COPY[status][locale];
}

export function ProjectCard({
  project,
  locale,
  viewLabel,
}: {
  project: ProjectSummary;
  locale: Locale;
  viewLabel: string;
}) {
  const title = getLocalizedValue(project.title, locale) ?? project.title.en ?? "";
  const category = CATEGORY_LABELS[project.projectCategory][locale];

  return (
    <article className="premium-card group overflow-hidden">
      <Link href={`/projects/${project.slug}`}>
        <ProjectVisual
          image={project.coverImage}
          locale={locale}
          title={title}
          className="aspect-[4/3] grayscale-[0.08]"
        />
        <div className="border-x border-b border-line bg-surface p-5 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                {category} · {statusLabel(project.status, locale)}
              </p>
              <h2 className="display mt-3 text-[1.75rem] leading-tight">{title}</h2>
              <p className="mt-2 text-sm text-muted">
                {project.showFullAddress && project.address
                  ? project.address
                  : `${project.suburb}, ${BRAND_COPY.stateAbbreviation}`}
                {project.completedYear ? ` · ${project.completedYear}` : ""}
              </p>
            </div>
            <ArrowUpRight
              className="mt-1 size-5 shrink-0 text-charcoal/55 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-red"
              aria-hidden="true"
            />
          </div>
          <span className="sr-only">{viewLabel}</span>
        </div>
      </Link>
    </article>
  );
}
