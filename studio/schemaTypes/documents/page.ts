import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
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
    defineField({ name: "seoTitle", title: "SEO title", type: "localizedString" }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "localizedText",
    }),
    defineField({ name: "heroTitle", title: "Hero title", type: "localizedString" }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "localizedText",
    }),
    defineField({ name: "content", title: "Content", type: "localizedBlockContent" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "slug.current" },
  },
});
