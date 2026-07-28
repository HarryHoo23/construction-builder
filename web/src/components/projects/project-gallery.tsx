import type { Locale } from "@/i18n/routing";
import type { SanityImage } from "@/sanity/types";
import { ProjectVisual } from "./project-visual";

export function ProjectGallery({
  images,
  locale,
  title,
}: {
  images: SanityImage[];
  locale: Locale;
  title: string;
}) {
  if (!images.length) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <ProjectVisual locale={locale} title={title} className="aspect-[4/3]" />
        <ProjectVisual locale={locale} title={title} className="aspect-[4/3] opacity-80" />
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {images.map((image, index) => (
        <ProjectVisual
          key={`${image.asset?._ref ?? "image"}-${index}`}
          image={image}
          locale={locale}
          title={title}
          className="aspect-[4/3]"
        />
      ))}
    </div>
  );
}
