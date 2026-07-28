"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { CATEGORY_LABELS, PROJECT_CATEGORIES } from "@/lib/constants";
import type { ProjectSummary, ProjectStatus } from "@/sanity/types";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectGrid } from "./project-grid";

export function ProjectFilters({
  projects,
  locale,
  labels,
}: {
  projects: ProjectSummary[];
  locale: Locale;
  labels: {
    category: string;
    status: string;
    all: string;
    view: string;
    emptyTitle: string;
    emptyBody: string;
  };
}) {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (category === "all" || project.projectCategory === category) &&
          (status === "all" || project.status === status),
      ),
    [category, projects, status],
  );

  const statusOptions: Array<{ value: "all" | ProjectStatus; label: string }> = [
    { value: "all", label: labels.all },
    { value: "completed", label: locale === "zh" ? "已完成" : "Completed" },
    {
      value: "under-construction",
      label: locale === "zh" ? "施工中" : "Under construction",
    },
    { value: "coming-soon", label: locale === "zh" ? "即将推出" : "Coming soon" },
  ];

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 border-y border-line py-5 sm:flex-row">
        <label className="flex flex-1 items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
          {labels.category}
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-11 flex-1 bg-transparent px-3 text-sm font-normal normal-case tracking-normal"
          >
            <option value="all">{labels.all}</option>
            {PROJECT_CATEGORIES.map((value) => (
              <option key={value} value={value}>
                {CATEGORY_LABELS[value][locale]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
          {labels.status}
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="min-h-11 flex-1 bg-transparent px-3 text-sm font-normal normal-case tracking-normal"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {filtered.length ? (
        <ProjectGrid projects={filtered} locale={locale} viewLabel={labels.view} />
      ) : (
        <EmptyState title={labels.emptyTitle} body={labels.emptyBody} />
      )}
    </div>
  );
}
