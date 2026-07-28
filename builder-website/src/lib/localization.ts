import type { Locale } from "@/i18n/routing";

type LocalizedValue<T> = {
  en?: T | null;
  zh?: T | null;
} | null;

export function getLocalizedValue<T>(
  value: LocalizedValue<T> | undefined,
  locale: Locale,
): T | undefined {
  if (!value) return undefined;
  return (locale === "zh" && value.zh ? value.zh : value.en) ?? undefined;
}
