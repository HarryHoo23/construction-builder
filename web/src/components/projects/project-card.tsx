import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CATEGORY_LABELS } from "@/lib/constants";
import { getLocalizedValue } from "@/lib/localization";
import type { ProjectSummary } from "@/sanity/types";
import { ProjectVisual } from "./project-visual";

function statusLabel(status: ProjectSummary["status"], locale: Locale) {
  const labels = {
    completed: { en: "Completed", zh: "已完成" },
    "under-construction": { en: "Under construction", zh: "施工中" },
    "coming-soon": { en: "Coming soon", zh: "即将推出" },
  };
  return labels[status][locale];
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
    <article className="group">
      <Link href={`/projects/${project.slug}`}>
        <ProjectVisual
          image={project.coverImage}
          locale={locale}
          title={title}
          className="aspect-[4/3]"
        />
        <div className="border-x border-b border-line bg-surface p-5 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {category} · {statusLabel(project.status, locale)}
              </p>
              <h2 className="display mt-3 text-2xl leading-tight">{title}</h2>
              <p className="mt-2 text-sm text-muted">
                {project.showFullAddress && project.address
                  ? project.address
                  : `${project.suburb}, VIC`}
                {project.completedYear ? ` · ${project.completedYear}` : ""}
              </p>
            </div>
            <ArrowUpRight
              className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </div>
          <span className="sr-only">{viewLabel}</span>
        </div>
      </Link>
    </article>
  );
}
