import { defineArrayMember, defineField, defineType } from "sanity";

const blocks = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Heading 2", value: "h2" },
      { title: "Heading 3", value: "h3" },
      { title: "Quote", value: "blockquote" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      annotations: [
        {
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            {
              name: "href",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
            },
          ],
        },
      ],
    },
  }),
];

export const localizedBlockContent = defineType({
  name: "localizedBlockContent",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: blocks,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zh",
      title: "中文",
      type: "array",
      of: blocks,
    }),
  ],
});
