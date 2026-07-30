import { defineField, defineType } from 'sanity';

export const projectImage = defineType({
  name: "projectImage",
  title: "Project image",
  type: "image",
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
  preview: {
    select: {
      title: "alt.en",
      media: "asset",
    },
  },
});
