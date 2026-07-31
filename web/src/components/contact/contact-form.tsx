"use client";

import Script from "next/script";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AU_PHONE_PATTERN,
  CATEGORY_LABELS,
  EMAIL_PATTERN,
  PROJECT_CATEGORIES,
} from "@/lib/constants";
import {
  initialContactFormState,
  submitContactEnquiry,
  type ContactFormStatus,
} from "@/app/[locale]/contact/actions";
import { cn } from "@/lib/utils";

type TurnstileWidgetId = string;

type TurnstileOptions = {
  sitekey: string;
  theme: "light";
  size: "flexible";
  action: "contact";
  callback: () => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  "response-field": true;
  "response-field-name": "cf-turnstile-response";
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: TurnstileOptions,
      ) => TurnstileWidgetId;
      reset: (widgetId?: TurnstileWidgetId) => void;
      remove: (widgetId: TurnstileWidgetId) => void;
    };
  }
}

export type ContactFormLabels = {
  name: string;
  email: string;
  emailFormat: string;
  phone: string;
  phoneFormat: string;
  language: string;
  projectType: string;
  suburb: string;
  message: string;
  english: string;
  chinese: string;
  emptySelect: string;
  send: string;
  sending: string;
  notice: string;
  success: string;
  validationError: string;
  turnstileError: string;
  rateLimitError: string;
  sendError: string;
  configurationError: string;
  nameError: string;
  emailError: string;
  phoneError: string;
  projectTypeError: string;
  suburbError: string;
  messageError: string;
};

const fieldClass =
  "mt-2 min-h-13 w-full rounded-none border-line bg-surface px-4 text-base shadow-none focus-visible:border-secondary focus-visible:ring-secondary/15";
const validatedFieldClass =
  `${fieldClass} user-invalid:border-destructive user-invalid:ring-destructive/15`;

function getStatusMessage(
  status: ContactFormStatus,
  labels: ContactFormLabels,
) {
  switch (status) {
    case "success":
      return labels.success;
    case "validation_error":
      return labels.validationError;
    case "turnstile_error":
      return labels.turnstileError;
    case "rate_limited":
      return labels.rateLimitError;
    case "send_error":
      return labels.sendError;
    case "configuration_error":
      return labels.configurationError;
    default:
      return null;
  }
}

export function ContactForm({
  locale,
  labels,
  turnstileSiteKey,
}: {
  locale: Locale;
  labels: ContactFormLabels;
  turnstileSiteKey: string;
}) {
  const [state, formAction, isPending] = useActionState(
    submitContactEnquiry,
    initialContactFormState,
  );
  const [turnstileReady, setTurnstileReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null);

  const renderTurnstile = useCallback(() => {
    if (
      !turnstileSiteKey ||
      !turnstileContainerRef.current ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: turnstileSiteKey,
        theme: "light",
        size: "flexible",
        action: "contact",
        callback: () => setTurnstileReady(true),
        "expired-callback": () => setTurnstileReady(false),
        "error-callback": () => setTurnstileReady(false),
        "response-field": true,
        "response-field-name": "cf-turnstile-response",
      },
    );
  }, [turnstileSiteKey]);

  useEffect(() => {
    renderTurnstile();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderTurnstile]);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }

    if (state.resetTurnstile && widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current);
      setTurnstileReady(false);
    }
  }, [state.resetTurnstile, state.status, state.submissionId]);

  const statusMessage =
    getStatusMessage(state.status, labels) ||
    (!turnstileSiteKey ? labels.configurationError : null);
  const hasError = (field: keyof NonNullable<typeof state.fieldErrors>) =>
    Boolean(state.fieldErrors?.[field]?.length);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
        onReady={renderTurnstile}
      />
      <form
        ref={formRef}
        action={formAction}
        className="grid min-w-0 gap-6 border border-line bg-surface p-5 sm:grid-cols-2 sm:p-9 lg:p-10 xl:p-12"
        aria-describedby="form-notice form-status"
      >
        <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {labels.name}
          <Input
            className={fieldClass}
            type="text"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
            aria-invalid={hasError("name")}
          />
          {hasError("name") ? (
            <span className="mt-2 block text-xs normal-case tracking-normal text-destructive">
              {labels.nameError}
            </span>
          ) : null}
        </Label>

        <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {labels.email}
          <Input
            className={validatedFieldClass}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            pattern={EMAIL_PATTERN}
            title={labels.emailFormat}
            maxLength={254}
            required
            aria-invalid={hasError("email")}
          />
          {hasError("email") ? (
            <span className="mt-2 block text-xs normal-case tracking-normal text-destructive">
              {labels.emailError}
            </span>
          ) : null}
        </Label>

        <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {labels.phone}
          <Input
            className={validatedFieldClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            pattern={AU_PHONE_PATTERN}
            title={labels.phoneFormat}
            maxLength={30}
            aria-invalid={hasError("phone")}
          />
          {hasError("phone") ? (
            <span className="mt-2 block text-xs normal-case tracking-normal text-destructive">
              {labels.phoneError}
            </span>
          ) : null}
        </Label>

        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          <span>{labels.language}</span>
          <Select name="preferredLanguage" defaultValue={locale}>
            <SelectTrigger
              aria-label={labels.language}
              className={fieldClass}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-line ring-0">
              <SelectItem value="en" className="rounded-none">
                {labels.english}
              </SelectItem>
              <SelectItem value="zh" className="rounded-none">
                {labels.chinese}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          <span>{labels.projectType}</span>
          <Select name="projectType" required>
            <SelectTrigger
              aria-label={labels.projectType}
              aria-invalid={hasError("projectType")}
              className={fieldClass}
            >
              <SelectValue placeholder={labels.emptySelect} />
            </SelectTrigger>
            <SelectContent className="rounded-none border-line ring-0">
              {PROJECT_CATEGORIES.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="rounded-none"
                >
                  {CATEGORY_LABELS[category][locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasError("projectType") ? (
            <span className="mt-2 block text-xs normal-case tracking-normal text-destructive">
              {labels.projectTypeError}
            </span>
          ) : null}
        </div>

        <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {labels.suburb}
          <Input
            className={fieldClass}
            type="text"
            name="suburb"
            minLength={2}
            maxLength={120}
            required
            aria-invalid={hasError("suburb")}
          />
          {hasError("suburb") ? (
            <span className="mt-2 block text-xs normal-case tracking-normal text-destructive">
              {labels.suburbError}
            </span>
          ) : null}
        </Label>

        <Label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:col-span-2">
          {labels.message}
          <Textarea
            className={`${fieldClass} min-h-40 py-3`}
            name="message"
            rows={6}
            minLength={10}
            maxLength={5000}
            required
            aria-invalid={hasError("message")}
          />
          {hasError("message") ? (
            <span className="mt-2 block text-xs normal-case tracking-normal text-destructive">
              {labels.messageError}
            </span>
          ) : null}
        </Label>

        <div className="sm:col-span-2">
          <div
            ref={turnstileContainerRef}
            className="mb-5 min-h-16 w-full"
          />
          <Button
            type="submit"
            disabled={isPending || !turnstileReady || !turnstileSiteKey}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isPending ? labels.sending : labels.send}
          </Button>
          <p
            id="form-notice"
            className="mt-4 max-w-xl text-sm leading-6 text-muted"
          >
            {labels.notice}
          </p>
          {statusMessage ? (
            <p
              id="form-status"
              role={state.status === "success" ? "status" : "alert"}
              aria-live="polite"
              className={cn(
                "mt-4 max-w-xl border-l-2 py-1 pl-4 text-sm leading-6",
                state.status === "success"
                  ? "border-secondary text-secondary"
                  : "border-destructive text-destructive",
              )}
            >
              {statusMessage}
            </p>
          ) : (
            <span id="form-status" className="sr-only" />
          )}
        </div>
      </form>
    </>
  );
}
