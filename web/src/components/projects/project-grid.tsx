import type { Locale } from "@/i18n/routing";
import type { ProjectSummary } from "@/sanity/types";
import { ProjectCard } from "./project-card";

export function ProjectGrid({
  projects,
  locale,
  viewLabel,
  animate = false,
}: {
  projects: ProjectSummary[];
  locale: Locale;
  viewLabel: string;
  animate?: boolean;
}) {
  return (
    <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          locale={locale}
          viewLabel={viewLabel}
          revealIndex={animate ? index : undefined}
        />
      ))}
    </div>
  );
}
