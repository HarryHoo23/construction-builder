"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { CATEGORY_LABELS, PROJECT_CATEGORIES } from "@/lib/constants";
import type { ProjectSummary, ProjectStatus } from "@/sanity/types";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <div className="flex flex-1 items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
          <span>{labels.category}</span>
          <Select
            value={category}
            onValueChange={(value) => value && setCategory(value)}
          >
            <SelectTrigger
              aria-label={labels.category}
              className="h-12 flex-1 rounded-none border-line bg-surface px-4 text-sm font-normal normal-case tracking-normal hover:border-secondary/70"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              align="start"
              className="rounded-none border border-line shadow-dropdown ring-0"
            >
              <SelectItem value="all" className="rounded-none">{labels.all}</SelectItem>
              {PROJECT_CATEGORIES.map((value) => (
                <SelectItem key={value} value={value} className="rounded-none">
                  {CATEGORY_LABELS[value][locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-1 items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
          <span>{labels.status}</span>
          <Select
            value={status}
            onValueChange={(value) => value && setStatus(value)}
          >
            <SelectTrigger
              aria-label={labels.status}
              className="h-12 flex-1 rounded-none border-line bg-surface px-4 text-sm font-normal normal-case tracking-normal hover:border-secondary/70"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              align="start"
              className="rounded-none border border-line shadow-dropdown ring-0"
            >
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-none">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {filtered.length ? (
        <ProjectGrid projects={filtered} locale={locale} viewLabel={labels.view} />
      ) : (
        <EmptyState title={labels.emptyTitle} body={labels.emptyBody} />
      )}
    </div>
  );
}
