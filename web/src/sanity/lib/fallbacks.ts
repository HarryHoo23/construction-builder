import type {
  ProjectDetail,
  ProjectSummary,
  Service,
  SiteSettings,
  Testimonial,
} from "../types";

export const fallbackSiteSettings: SiteSettings = {
  companyName: {
    en: "Hongwei Construction",
    zh: "宏伟建筑",
  },
  shortCompanyName: {
    en: "Hongwei",
    zh: "宏伟",
  },
  companyDescription: {
    en: "Professional residential construction for Melbourne homes and multi-dwelling developments.",
    zh: "专注墨尔本住宅与多户住宅开发的专业建造团队。",
  },
  serviceAreas: [
    { en: "Inner East", zh: "东区" },
    { en: "South East", zh: "东南区" },
    { en: "Greater Melbourne", zh: "大墨尔本地区" },
  ],
};

export const fallbackProjects: ProjectSummary[] = [
  {
    _id: "fallback-dual-occupancy",
    title: { en: "Dual Occupancy Project", zh: "双拼住宅项目" },
    slug: "example-project",
    projectCategory: "dual-occupancy",
    status: "coming-soon",
    suburb: "Mount Waverley",
    showFullAddress: false,
    shortDescription: {
      en: "A considered two-home development designed around privacy, light and practical family living.",
      zh: "围绕私密性、采光与家庭生活打造的双住宅项目。",
    },
    featured: true,
  },
  {
    _id: "fallback-custom-home",
    title: { en: "Custom Home Study", zh: "定制住宅方案" },
    slug: "custom-home-study",
    projectCategory: "custom-home",
    status: "under-construction",
    suburb: "Glen Waverley",
    showFullAddress: false,
    shortDescription: {
      en: "A site-responsive family home with layered living spaces and durable natural materials.",
      zh: "结合场地条件，以层次丰富的生活空间和耐久天然材料打造的家庭住宅。",
    },
    featured: true,
  },
  {
    _id: "fallback-renovation",
    title: { en: "Residential Extension Study", zh: "住宅扩建方案" },
    slug: "residential-extension-study",
    projectCategory: "extension",
    status: "completed",
    suburb: "Camberwell",
    showFullAddress: false,
    shortDescription: {
      en: "A calm, light-filled addition that connects an existing home to its garden.",
      zh: "以宁静通透的新空间，将既有住宅与花园自然相连。",
    },
    featured: true,
  },
];

export const fallbackServices: Service[] = [
  {
    _id: "service-multi",
    title: { en: "Multi-dwelling developments", zh: "多户住宅开发" },
    slug: "multi-dwelling-developments",
    shortDescription: {
      en: "Dual occupancies, three-townhouse developments and considered infill housing.",
      zh: "双拼住宅、三套联排别墅开发及高品质城市填充住宅。",
    },
    featured: true,
  },
  {
    _id: "service-custom",
    title: { en: "Custom homes", zh: "定制住宅" },
    slug: "custom-homes",
    shortDescription: {
      en: "Site-specific new homes built around your family, priorities and long-term plans.",
      zh: "围绕家庭需求、生活重点与长期规划打造的场地定制住宅。",
    },
    featured: true,
  },
  {
    _id: "service-renovation",
    title: { en: "Renovations & extensions", zh: "翻新与扩建" },
    slug: "renovations-extensions",
    shortDescription: {
      en: "Careful transformations that preserve what works and improve how your home lives.",
      zh: "保留原有住宅价值，细致改善空间与日常使用体验。",
    },
    featured: true,
  },
];

export const fallbackTestimonials: Testimonial[] = [];

export function getFallbackProject(slug: string): ProjectDetail | null {
  const project = fallbackProjects.find((item) => item.slug === slug);
  if (!project) return null;

  return {
    ...project,
    bedrooms: slug === "example-project" ? 6 : 4,
    bathrooms: slug === "example-project" ? 4 : 3,
    carSpaces: 2,
    numberOfDwellings: slug === "example-project" ? 2 : 1,
    description: {
      en: [
        {
          _key: "fallback-description",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "fallback-span",
              _type: "span",
              marks: [],
              text: project.shortDescription?.en ?? "",
            },
          ],
        },
      ],
      zh: [
        {
          _key: "fallback-description-zh",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "fallback-span-zh",
              _type: "span",
              marks: [],
              text: project.shortDescription?.zh ?? "",
            },
          ],
        },
      ],
    },
  };
}
