import { z } from "zod";
import {
  AU_PHONE_PATTERN,
  EMAIL_PATTERN,
  PROJECT_CATEGORIES,
} from "./constants";

const emailRegex = new RegExp(`^(?:${EMAIL_PATTERN})$`);
const phoneRegex = new RegExp(`^(?:${AU_PHONE_PATTERN})$`);

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().max(254).regex(emailRegex),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((value) => value === "" || phoneRegex.test(value)),
  preferredLanguage: z.enum(["en", "zh"]),
  projectType: z.enum(PROJECT_CATEGORIES),
  suburb: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(5000),
});

export type ContactEnquiry = z.infer<typeof contactEnquirySchema>;
