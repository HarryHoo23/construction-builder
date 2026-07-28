import type { Locale } from "@/i18n/routing";
import type { SiteSettings } from "@/sanity/types";
import { SITE_URL } from "./constants";
import { getLocalizedValue } from "./localization";

export function createContractorJsonLd(
  settings: SiteSettings,
  locale: Locale,
) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name:
      getLocalizedValue(settings.companyName, locale) ??
      "Melbourne Residential Builder",
    url: `${SITE_URL}/${locale}`,
    areaServed:
      settings.serviceAreas
        ?.map((area) => getLocalizedValue(area, locale))
        .filter(Boolean) ?? [],
  };

  if (settings.phone) data.telephone = settings.phone;
  if (settings.email) data.email = settings.email;
  if (settings.officeAddress) data.address = settings.officeAddress;

  return data;
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
