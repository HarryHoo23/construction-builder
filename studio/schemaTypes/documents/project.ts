import { defineArrayMember, defineField, defineType } from "sanity";
import {
  CATEGORY_LABELS,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "../../constants";

const nonNegativeNumber = (title: string) =>
  defineField({
    name: title,
    title: title
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (letter) => letter.toUpperCase()),
    type: "number",
    validation: (Rule) => Rule.min(0),
  });

const imageCollection = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "projectImage" })],
    options: { layout: "grid" },
  });

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "core", title: "Core information", default: true },
    { name: "specs", title: "Specifications" },
    { name: "content", title: "Content" },
    { name: "images", title: "Images" },
    { name: "links", title: "External links" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "localizedString",
      group: "core",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "core",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectCategory",
      title: "Project category",
      type: "string",
      group: "core",
      options: {
        list: PROJECT_CATEGORIES.map((value) => ({
          value,
          title: `${CATEGORY_LABELS[value].en} / ${CATEGORY_LABELS[value].zh}`,
        })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "core",
      initialValue: "coming-soon",
      options: {
        list: PROJECT_STATUSES.map((value) => ({
          value,
          title:
            value === "completed"
              ? "Completed / 已完成"
              : value === "under-construction"
                ? "Under construction / 施工中"
                : "Coming soon / 即将推出",
        })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "suburb",
      title: "Suburb",
      type: "string",
      group: "core",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Full address",
      type: "string",
      group: "core",
    }),
    defineField({
      name: "showFullAddress",
      title: "Show full address publicly",
      description: "Leave off to display only the suburb and VIC.",
      type: "boolean",
      group: "core",
      initialValue: false,
    }),
    defineField({
      name: "completedYear",
      title: "Completed year",
      type: "number",
      group: "core",
      validation: (Rule) =>
        Rule.integer().min(1900).max(new Date().getFullYear() + 10),
    }),
    defineField({
      name: "featured",
      title: "Featured project",
      type: "boolean",
      group: "core",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "core",
      validation: (Rule) => Rule.integer().min(0),
    }),
    ...[
      nonNegativeNumber("bedrooms"),
      nonNegativeNumber("bathrooms"),
      nonNegativeNumber("carSpaces"),
      nonNegativeNumber("numberOfDwellings"),
      nonNegativeNumber("siteArea"),
    ].map((field) => ({ ...field, group: "specs" })),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "localizedText",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedBlockContent",
      group: "content",
    }),
    defineField({
      name: "designHighlights",
      title: "Design highlights",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "localizedString" })],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "images",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description:
            "Optional. If left blank, the website uses the project name, location and image number.",
          type: "localizedString",
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "localizedString",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    imageCollection("gallery", "Gallery"),
    imageCollection("beforeImages", "Before images"),
    imageCollection("constructionImages", "Construction images"),
    imageCollection("afterImages", "After images"),
    imageCollection("floorPlans", "Floor plans"),
    defineField({
      name: "realEstateUrl",
      title: "realestate.com.au URL",
      type: "url",
      group: "links",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "domainUrl",
      title: "Domain URL",
      type: "url",
      group: "links",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      suburb: "suburb",
      category: "projectCategory",
      media: "coverImage",
    },
    prepare({ title, suburb, category, media }) {
      const categoryTitle =
        CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]?.en ?? category;
      return {
        title,
        subtitle: [suburb, categoryTitle].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
