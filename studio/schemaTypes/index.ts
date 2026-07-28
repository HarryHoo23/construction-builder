import { localizedString } from "./objects/localized-string";
import { localizedText } from "./objects/localized-text";
import { localizedBlockContent } from "./objects/localized-block-content";
import { projectImage } from "./objects/project-image";
import { project } from "./documents/project";
import { service } from "./documents/service";
import { testimonial } from "./documents/testimonial";
import { page } from "./documents/page";
import { siteSettings } from "./documents/site-settings";

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedBlockContent,
  projectImage,
  project,
  service,
  testimonial,
  page,
  siteSettings,
];
