import { defineQuery } from "next-sanity";

const imageFields = `{
  asset,
  crop,
  hotspot,
  alt,
  caption
}`;

const projectCardFields = `
  _id,
  title,
  "slug": slug.current,
  projectCategory,
  status,
  suburb,
  address,
  showFullAddress,
  completedYear,
  featured,
  shortDescription,
  coverImage ${imageFields}
`;

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    companyName,
    shortCompanyName,
    tagline,
    companyDescription,
    email,
    phone,
    wechatId,
    builderLicenceNumber,
    abn,
    officeAddress,
    serviceAreas,
    instagramUrl,
    facebookUrl,
    linkedinUrl,
    defaultSeoTitle,
    defaultSeoDescription
  }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(featured desc, displayOrder asc, _createdAt desc)[0...3] {
    ${projectCardFields}
  }
`);

export const ALL_PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(displayOrder asc, _createdAt desc) {
    ${projectCardFields}
  }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectCardFields},
    bedrooms,
    bathrooms,
    carSpaces,
    numberOfDwellings,
    siteArea,
    description,
    designHighlights,
    gallery[] ${imageFields},
    beforeImages[] ${imageFields},
    constructionImages[] ${imageFields},
    afterImages[] ${imageFields},
    floorPlans[] ${imageFields},
    realEstateUrl,
    domainUrl
  }
`);

export const ALL_SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(displayOrder asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    iconName,
    featured,
    coverImage ${imageFields}
  }
`);

export const FEATURED_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(displayOrder asc)[0...3] {
    _id,
    clientName,
    clientLocation,
    quote,
    rating
  }
`);
