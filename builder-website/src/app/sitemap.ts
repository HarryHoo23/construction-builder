import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { fallbackProjects } from "@/sanity/lib/fallbacks";
import { safeSanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { ProjectSummary } from "@/sanity/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await safeSanityFetch<ProjectSummary[]>({
    query: ALL_PROJECTS_QUERY,
    fallback: fallbackProjects,
  });
  const staticRoutes = ["", "/projects", "/services", "/about", "/contact"];

  return routing.locales.flatMap((locale) => [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${route}`,
          "zh-CN": `${SITE_URL}/zh${route}`,
        },
      },
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects/${project.slug}`,
          "zh-CN": `${SITE_URL}/zh/projects/${project.slug}`,
        },
      },
    })),
  ]);
}
