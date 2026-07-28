import { defineArrayMember, defineField, defineType } from 'sanity';

const socialUrl = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "url",
    validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company name",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortCompanyName",
      title: "Short company name",
      type: "localizedString",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "localizedString" }),
    defineField({
      name: "companyDescription",
      title: "Company description",
      type: "localizedText",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "darkLogo",
      title: "Logo for dark backgrounds",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "wechatId", title: "WeChat ID", type: "string" }),
    defineField({ name: "wechatQrCode", title: "WeChat QR code", type: "image" }),
    defineField({
      name: "builderLicenceNumber",
      title: "Builder licence number",
      type: "string",
    }),
    defineField({ name: "abn", title: "ABN", type: "string" }),
    defineField({
      name: "officeAddress",
      title: "Office address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "serviceAreas",
      title: "Service areas",
      type: "array",
      of: [defineArrayMember({ type: "localizedString" })],
    }),
    socialUrl("instagramUrl", "Instagram URL"),
    socialUrl("facebookUrl", "Facebook URL"),
    socialUrl("linkedinUrl", "LinkedIn URL"),
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO title",
      type: "localizedString",
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO description",
      type: "localizedText",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default social sharing image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
