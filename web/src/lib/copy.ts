import type { Locale } from "@/i18n/routing";

type LocalizedCopy<T> = Record<Locale, T>;

export function getCopy<C extends Record<Locale, unknown>>(
  copy: C,
  locale: Locale,
): C[Locale] {
  return copy[locale];
}

export const BRAND_COPY = {
  companyName: "Hongwei Construction",
  wordmark: "HONGWEI",
  descriptor: "Construction",
  stateAbbreviation: "VIC",
  cityState: "Melbourne · Victoria",
  fullLocation: "Melbourne · Victoria · Australia",
} as const;

export const ROOT_METADATA_COPY = {
  defaultTitle: "Hongwei Construction | Melbourne Builder",
  titleTemplate: "%s | Hongwei Construction",
  description:
    "Considered residential construction, dual occupancy and custom homes across Melbourne.",
  socialAlt: "Hongwei Construction — Homes shaped around the way you live.",
} as const;

export const LOCALE_METADATA_COPY = {
  en: {
    title: "Hongwei Construction | Melbourne Builder",
    description:
      "Considered residential construction, dual occupancy and custom homes across Melbourne.",
    openGraphLocale: "en_AU",
    htmlLanguage: "en-AU",
  },
  zh: {
    title: "Hongwei Construction｜墨尔本住宅建造",
    description: "墨尔本双拼住宅、联排别墅、定制住宅与翻新扩建服务。",
    openGraphLocale: "zh_CN",
    htmlLanguage: "zh-CN",
  },
} as const satisfies LocalizedCopy<{
  title: string;
  description: string;
  openGraphLocale: string;
  htmlLanguage: string;
}>;

export const PAGE_METADATA_COPY = {
  about: {
    en: { title: "About" },
    zh: { title: "关于我们" },
  },
  contact: {
    en: { title: "Contact" },
    zh: { title: "联系我们" },
  },
  projects: {
    en: {
      title: "Residential Projects",
      description:
        "Explore completed, current and upcoming residential building projects across Melbourne.",
    },
    zh: {
      title: "住宅项目",
      description: "浏览我们在墨尔本的住宅建造项目。",
    },
  },
  services: {
    en: { title: "Residential Building Services" },
    zh: { title: "住宅建造服务" },
  },
} as const;

export const ACCESSIBILITY_COPY = {
  primaryNavigation: "Primary navigation",
  mobileNavigation: "Mobile navigation",
  languageSelection: "Language selection",
  switchToEnglish: "Switch to English",
  switchToChinese: "切换为简体中文",
} as const;

export const PROJECT_STATUS_COPY = {
  completed: { en: "Completed", zh: "已完成" },
  "under-construction": { en: "Under construction", zh: "施工中" },
  "coming-soon": { en: "Coming soon", zh: "即将推出" },
} as const;

export const HOME_COPY = {
  en: {
    projectPortfolioEyebrow: "Project portfolio",
    servicesEyebrow: "Our services",
    processEyebrow: "From brief to handover",
    testimonialsEyebrow: "Client experience",
    serviceAreasEyebrow: "Service areas",
    finalCtaEyebrow: "Start the conversation",
    whyChooseUs: [
      {
        title: "Integrated delivery",
        body: "From feasibility to handover, we keep design intent, budget and construction aligned.",
      },
      {
        title: "Clear communication",
        body: "Scope, key decisions and progress stay visible so you always know what comes next.",
      },
      {
        title: "Detail-led craftsmanship",
        body: "Materials, trades and site details are coordinated around enduring residential quality.",
      },
      {
        title: "Melbourne knowledge",
        body: "Local sites, planning conditions and family lifestyles inform every practical decision.",
      },
    ],
    developmentTypes: [
      {
        number: "01",
        title: "Dual occupancy",
        body: "Unlock site potential while protecting privacy, natural light and independent living.",
      },
      {
        number: "02",
        title: "Townhouse developments",
        body: "Considered multi-home outcomes for Melbourne infill sites and growing communities.",
      },
      {
        number: "03",
        title: "Custom homes",
        body: "Individual residences shaped around the site, your family and long-term plans.",
      },
      {
        number: "04",
        title: "Renovations & extensions",
        body: "Retain what matters and transform how an existing home connects, functions and feels.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discover",
        body: "Clarify the site, priorities, budget framework and a viable path forward.",
      },
      {
        number: "02",
        title: "Plan",
        body: "Coordinate design, pricing, approvals and the decisions required before site work.",
      },
      {
        number: "03",
        title: "Build",
        body: "Manage progress, quality and handover with clear communication throughout.",
      },
    ],
    emptyTestimonials:
      "Our reputation is built through every clear conversation, considered site detail and carefully handed-over home.",
    serviceAreasBody:
      "Serving Melbourne’s inner east, south east and greater metropolitan area. Contact us to discuss your location.",
    defaultServiceAreas: ["Inner East", "South East", "Greater Melbourne"],
  },
  zh: {
    projectPortfolioEyebrow: "项目作品",
    servicesEyebrow: "专业服务",
    processEyebrow: "从构想到交付",
    testimonialsEyebrow: "客户体验",
    serviceAreasEyebrow: "服务区域",
    finalCtaEyebrow: "开启下一步",
    whyChooseUs: [
      {
        title: "设计与施工协同",
        body: "从前期可行性到最终交付，让设计意图、预算与施工保持一致。",
      },
      {
        title: "透明直接的沟通",
        body: "明确项目范围、关键决策与施工进度，让每一步都有清晰预期。",
      },
      {
        title: "对细节的坚持",
        body: "以长期居住品质为标准，认真协调材料、工艺与现场细节。",
      },
      {
        title: "熟悉墨尔本住宅",
        body: "理解本地场地、规划环境与家庭生活方式，制定务实建造路径。",
      },
    ],
    developmentTypes: [
      {
        number: "01",
        title: "双拼住宅",
        body: "充分利用场地潜力，同时兼顾私密性、采光与独立生活体验。",
      },
      {
        number: "02",
        title: "联排别墅开发",
        body: "为墨尔本城市住宅用地提供规划周全、具市场吸引力的多户方案。",
      },
      {
        number: "03",
        title: "定制住宅",
        body: "围绕家庭、场地与长期生活需求打造专属住宅。",
      },
      {
        number: "04",
        title: "翻新与扩建",
        body: "保留既有住宅价值，并以更好的空间、采光和连接方式提升日常生活。",
      },
    ],
    process: [
      {
        number: "01",
        title: "前期沟通",
        body: "明确场地条件、目标、预算框架与可行路径。",
      },
      {
        number: "02",
        title: "规划与准备",
        body: "协调设计、报价、审批与施工前的关键决策。",
      },
      {
        number: "03",
        title: "施工与交付",
        body: "以透明沟通管理进度、品质与最终交付。",
      },
    ],
    emptyTestimonials:
      "我们的口碑，来自每一次清晰沟通、每一个现场细节与每一套用心交付的住宅。",
    serviceAreasBody:
      "服务墨尔本东区、东南区及大墨尔本地区。具体服务范围欢迎与我们确认。",
    defaultServiceAreas: ["墨尔本东区", "墨尔本东南区", "大墨尔本地区"],
  },
} as const;

export const ABOUT_PAGE_COPY = {
  en: {
    metadataTitle: "About",
    visualEyebrow: "Homes · Sites · People",
    visualStatement:
      "A good build is as much about the path to the finished home as the home itself.",
    cta: "Discuss your project",
  },
  zh: {
    metadataTitle: "关于我们",
    visualEyebrow: "住宅 · 场地 · 生活",
    visualStatement: "好的建造不仅关乎成品，也关乎抵达成品的每一步。",
    cta: "与我们聊聊",
  },
} as const;

export const CONTACT_PAGE_COPY = {
  en: {
    metadataTitle: "Contact",
    directTitle: "Contact directly",
    missingPhone: "Add phone in Site Settings",
    missingEmail: "Add email in Site Settings",
  },
  zh: {
    metadataTitle: "联系我们",
    directTitle: "直接联系",
    missingPhone: "在网站设置中添加电话",
    missingEmail: "在网站设置中添加邮箱",
  },
  emptySelect: "—",
} as const;

export const PROJECT_DETAIL_COPY = {
  en: {
    back: "Back to projects",
    cta: "Start a conversation",
    metadataFallbackSuffix: "VIC residential building project.",
  },
  zh: {
    back: "返回项目",
    cta: "联系我们",
    metadataFallbackSuffix: "维多利亚州住宅建造项目。",
  },
} as const;

export const FOOTER_COPY = {
  builderLicence: { en: "Builder licence", zh: "建筑商执照" },
} as const;

export const GALLERY_COPY = {
  en: {
    modalLabel: "Project image gallery",
    openImage: "Open image",
    close: "Close gallery",
    previous: "Previous image",
    next: "Next image",
    image: "Image",
    of: "of",
  },
  zh: {
    modalLabel: "项目图片画廊",
    openImage: "打开图片",
    close: "关闭画廊",
    previous: "上一张图片",
    next: "下一张图片",
    image: "图片",
    of: "共",
  },
} as const;
