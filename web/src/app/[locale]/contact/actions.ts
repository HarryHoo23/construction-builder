"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { CATEGORY_LABELS } from "@/lib/constants";
import {
  contactEnquirySchema,
  type ContactEnquiry,
} from "@/lib/contact-schema";
import { checkContactRateLimit } from "@/lib/contact-rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export type ContactFormStatus =
  | "idle"
  | "success"
  | "validation_error"
  | "turnstile_error"
  | "rate_limited"
  | "send_error"
  | "configuration_error";

export type ContactFormState = {
  status: ContactFormStatus;
  fieldErrors?: Partial<Record<keyof ContactEnquiry, string[]>>;
  submissionId: string;
  resetTurnstile?: boolean;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  submissionId: "initial",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getClientIp(headerStore: Awaited<ReturnType<typeof headers>>) {
  return (
    headerStore.get("cf-connecting-ip") ??
    headerStore.get("x-real-ip") ??
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function buildEmailContent(enquiry: ContactEnquiry) {
  const projectType = CATEGORY_LABELS[enquiry.projectType].en;
  const phone = enquiry.phone || "Not provided";
  const text = [
    "New website enquiry",
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${phone}`,
    `Preferred language: ${enquiry.preferredLanguage}`,
    `Project type: ${projectType}`,
    `Project suburb: ${enquiry.suburb}`,
    "",
    "Message:",
    enquiry.message,
  ].join("\n");

  const rows = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", phone],
    ["Preferred language", enquiry.preferredLanguage],
    ["Project type", projectType],
    ["Project suburb", enquiry.suburb],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1f1f1f;line-height:1.6">
      <h1 style="font-size:24px;margin:0 0 24px">New website enquiry</h1>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="padding:8px 12px 8px 0;text-align:left;vertical-align:top;border-bottom:1px solid #d9d1c7">${escapeHtml(label)}</th>
                  <td style="padding:8px 0;border-bottom:1px solid #d9d1c7">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="font-size:16px;margin:0 0 8px">Message</h2>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>
    </div>
  `;

  return { html, text, projectType };
}

export async function submitContactEnquiry(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const submissionId = crypto.randomUUID();
  const parsed = contactEnquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    preferredLanguage: formData.get("preferredLanguage"),
    projectType: formData.get("projectType"),
    suburb: formData.get("suburb"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "validation_error",
      fieldErrors: parsed.error.flatten().fieldErrors,
      submissionId,
    };
  }

  const headerStore = await headers();
  const clientIp = getClientIp(headerStore);
  const turnstileToken = formData.get("cf-turnstile-response");
  const turnstile = await verifyTurnstileToken({
    token: typeof turnstileToken === "string" ? turnstileToken : "",
    remoteIp: clientIp === "unknown" ? undefined : clientIp,
  });

  if (!turnstile.success) {
    return {
      status: turnstile.configurationError
        ? "configuration_error"
        : "turnstile_error",
      submissionId,
      resetTurnstile: !turnstile.configurationError,
    };
  }

  const rateLimit = checkContactRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return {
      status: "rate_limited",
      submissionId,
      resetTurnstile: true,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const recipients = process.env.CONTACT_TO_EMAIL?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (!apiKey || !from || !recipients?.length) {
    return {
      status: "configuration_error",
      submissionId,
      resetTurnstile: true,
    };
  }

  const { html, text, projectType } = buildEmailContent(parsed.data);
  const subjectName = parsed.data.name.replace(/[\r\n]+/g, " ").slice(0, 80);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: parsed.data.email,
      subject: `Website enquiry: ${projectType} — ${subjectName}`,
      html,
      text,
    });

    if (error) {
      return {
        status: "send_error",
        submissionId,
        resetTurnstile: true,
      };
    }

    return {
      status: "success",
      submissionId,
      resetTurnstile: true,
    };
  } catch {
    return {
      status: "send_error",
      submissionId,
      resetTurnstile: true,
    };
  }
}
