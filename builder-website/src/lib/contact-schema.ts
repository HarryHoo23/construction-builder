import { z } from "zod";
import { PROJECT_CATEGORIES } from "./constants";

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().max(30).optional(),
  preferredLanguage: z.enum(["en", "zh"]),
  projectType: z.enum(PROJECT_CATEGORIES),
  suburb: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(5000),
});

export type ContactEnquiry = z.infer<typeof contactEnquirySchema>;
