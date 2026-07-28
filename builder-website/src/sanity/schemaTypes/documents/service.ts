import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "localizedText",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedBlockContent",
    }),
    defineField({
      name: "iconName",
      title: "Icon name",
      description: "A supported Lucide icon name for future display.",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: { title: "title.en", media: "coverImage" },
  },
});
