import type { Locale } from "@/i18n/routing";
import { getLocalizedValue } from "@/lib/localization";
import type { LocalizedString } from "@/sanity/types";

export function getProjectImageAlt({
  alt,
  locale,
  title,
  location,
  imageNumber,
}: {
  alt?: LocalizedString | null;
  locale: Locale;
  title: string;
  location?: string | null;
  imageNumber?: number;
}) {
  const manualAlt = getLocalizedValue(alt, locale)?.trim();

  if (manualAlt) return manualAlt;

  return [title, location?.trim(), imageNumber ? String(imageNumber) : null]
    .filter((part): part is string => Boolean(part))
    .join(" · ");
}
