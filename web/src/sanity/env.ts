export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-28";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "69j8m4rs";
export const readToken = process.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId && dataset);
