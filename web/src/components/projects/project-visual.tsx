import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { getLocalizedValue } from "@/lib/localization";
import type { SanityImage } from "@/sanity/types";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

export function ProjectVisual({
  image,
  locale,
  title,
  className,
  priority = false,
}: {
  image?: SanityImage | null;
  locale: Locale;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  const hasImage = Boolean(image?.asset?._ref);
  const alt = getLocalizedValue(image?.alt, locale) ?? title;

  return (
    <div className={cn("architectural-visual relative bg-[#9a9d90]", className)}>
      {hasImage && image ? (
        <Image
          src={urlForImage(image).width(1600).height(1100).fit("crop").url()}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="z-10 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <span className="sr-only">{alt}</span>
      )}
    </div>
  );
}
