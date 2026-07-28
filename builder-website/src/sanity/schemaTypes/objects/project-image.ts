import { defineField, defineType } from "sanity";

export const projectImage = defineType({
  name: "projectImage",
  title: "Project image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      description: "Describe the image for visitors using screen readers.",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      title: "alt.en",
      media: "asset",
    },
  },
});
