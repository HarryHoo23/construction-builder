"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { CATEGORY_LABELS, PROJECT_CATEGORIES } from "@/lib/constants";
import type { ProjectSummary, ProjectStatus } from "@/sanity/types";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectGrid } from "./project-grid";
import { PROJECT_STATUS_COPY } from "@/lib/copy";

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
    { value: "completed", label: PROJECT_STATUS_COPY.completed[locale] },
    {
      value: "under-construction",
      label: PROJECT_STATUS_COPY["under-construction"][locale],
    },
    { value: "coming-soon", label: PROJECT_STATUS_COPY["coming-soon"][locale] },
  ];

  return (
    <div>
      <div className="mb-12 flex flex-col gap-4 border border-line bg-surface p-4 sm:flex-row sm:p-5">
        <label className="flex flex-1 items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
          {labels.category}
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-11 flex-1 border-l border-line bg-transparent px-4 text-sm font-normal normal-case tracking-normal outline-none focus:border-brand-teal"
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
            className="min-h-11 flex-1 border-l border-line bg-transparent px-4 text-sm font-normal normal-case tracking-normal outline-none focus:border-brand-teal"
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
