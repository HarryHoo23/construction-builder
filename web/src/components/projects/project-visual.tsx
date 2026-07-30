import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { getProjectImageAlt } from "@/lib/project-image-alt";
import type { SanityImage } from "@/sanity/types";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

export function ProjectVisual({
  image,
  locale,
  title,
  location,
  imageNumber,
  className,
  priority = false,
}: {
  image?: SanityImage | null;
  locale: Locale;
  title: string;
  location?: string;
  imageNumber?: number;
  className?: string;
  priority?: boolean;
}) {
  const hasImage = Boolean(image?.asset?._ref);
  const alt = getProjectImageAlt({
    alt: image?.alt,
    locale,
    title,
    location,
    imageNumber,
  });

  return (
    <div
      className={cn(
        "architectural-visual relative w-full min-w-0 bg-taupe",
        className,
      )}
    >
      {hasImage && image ? (
        <Image
          src={urlForImage(image).width(1600).height(1100).fit("crop").url()}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="z-10 object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      ) : (
        <span className="sr-only">{alt}</span>
      )}
    </div>
  );
}
