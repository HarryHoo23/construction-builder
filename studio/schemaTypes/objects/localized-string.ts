import { defineField, defineType } from 'sanity';

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zh",
      title: "中文",
      type: "string",
    }),
  ],
});
