import type { Locale } from "@/i18n/routing";
import type { ProjectSummary } from "@/sanity/types";
import { ProjectCard } from "./project-card";

export function ProjectGrid({
  projects,
  locale,
  viewLabel,
}: {
  projects: ProjectSummary[];
  locale: Locale;
  viewLabel: string;
}) {
  return (
    <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          locale={locale}
          viewLabel={viewLabel}
        />
      ))}
    </div>
  );
}
