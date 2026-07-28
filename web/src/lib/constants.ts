export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PROJECT_CATEGORIES = [
  "dual-occupancy",
  "three-townhouses",
  "townhouse",
  "luxury-home",
  "custom-home",
  "renovation",
  "extension",
  "other",
] as const;

export const PROJECT_STATUSES = [
  "completed",
  "under-construction",
  "coming-soon",
] as const;

export const CATEGORY_LABELS = {
  "dual-occupancy": { en: "Dual occupancy", zh: "双拼住宅" },
  "three-townhouses": { en: "Three townhouses", zh: "三套联排别墅" },
  townhouse: { en: "Townhouse", zh: "联排别墅" },
  "luxury-home": { en: "Luxury home", zh: "高端住宅" },
  "custom-home": { en: "Custom home", zh: "定制住宅" },
  renovation: { en: "Renovation", zh: "住宅翻新" },
  extension: { en: "Extension", zh: "住宅扩建" },
  other: { en: "Other", zh: "其他" },
} as const;
