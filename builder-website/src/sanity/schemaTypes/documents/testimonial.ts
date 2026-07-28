import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientLocation",
      title: "Client location",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.integer().min(1).max(5),
    }),
    defineField({
      name: "relatedProject",
      title: "Related project",
      type: "reference",
      to: [{ type: "project" }],
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
    select: { title: "clientName", subtitle: "clientLocation" },
  },
});
