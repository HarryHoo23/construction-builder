import type {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "@/lib/constants";

export type LocalizedString = {
  en?: string | null;
  zh?: string | null;
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children?: Array<{
    _key: string;
    _type: "span";
    marks?: string[];
    text?: string;
  }>;
  markDefs?: Array<Record<string, unknown>>;
  style?: string;
  listItem?: string;
};

export type LocalizedBlockContent = {
  en?: PortableTextBlock[] | null;
  zh?: PortableTextBlock[] | null;
};

export type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
  alt?: LocalizedString;
  caption?: LocalizedString;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectSummary = {
  _id: string;
  title: LocalizedString;
  slug: string;
  projectCategory: ProjectCategory;
  status: ProjectStatus;
  suburb: string;
  address?: string | null;
  showFullAddress?: boolean | null;
  completedYear?: number | null;
  shortDescription?: LocalizedString | null;
  coverImage?: SanityImage | null;
  featured?: boolean | null;
};

export type ProjectDetail = ProjectSummary & {
  bedrooms?: number | null;
  bathrooms?: number | null;
  carSpaces?: number | null;
  numberOfDwellings?: number | null;
  siteArea?: number | null;
  description?: LocalizedBlockContent | null;
  designHighlights?: LocalizedString[] | null;
  gallery?: SanityImage[] | null;
  beforeImages?: SanityImage[] | null;
  constructionImages?: SanityImage[] | null;
  afterImages?: SanityImage[] | null;
  floorPlans?: SanityImage[] | null;
  realEstateUrl?: string | null;
  domainUrl?: string | null;
};

export type Service = {
  _id: string;
  title: LocalizedString;
  slug: string;
  shortDescription?: LocalizedString | null;
  description?: LocalizedBlockContent | null;
  iconName?: string | null;
  coverImage?: SanityImage | null;
  featured?: boolean | null;
};

export type Testimonial = {
  _id: string;
  clientName: string;
  clientLocation?: string | null;
  quote: LocalizedString;
  rating?: number | null;
};

export type SiteSettings = {
  companyName?: LocalizedString | null;
  shortCompanyName?: LocalizedString | null;
  tagline?: LocalizedString | null;
  companyDescription?: LocalizedString | null;
  email?: string | null;
  phone?: string | null;
  wechatId?: string | null;
  builderLicenceNumber?: string | null;
  abn?: string | null;
  officeAddress?: string | null;
  serviceAreas?: LocalizedString[] | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  defaultSeoTitle?: LocalizedString | null;
  defaultSeoDescription?: LocalizedString | null;
};
