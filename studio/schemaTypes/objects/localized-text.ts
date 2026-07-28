import { defineField, defineType } from 'sanity';

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zh",
      title: "中文",
      type: "text",
      rows: 4,
    }),
  ],
});
