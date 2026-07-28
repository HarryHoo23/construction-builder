"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { GALLERY_COPY, getCopy } from "@/lib/copy";
import { getLocalizedValue } from "@/lib/localization";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/types";
import { ProjectVisual } from "./project-visual";

function modalImageUrl(image: SanityImage) {
  return urlForImage(image)
    .width(2400)
    .fit("max")
    .auto("format")
    .quality(95)
    .url();
}

export function ProjectGallery({
  images,
  locale,
  title,
}: {
  images: SanityImage[];
  locale: Locale;
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"next" | "previous">("next");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const copy = getCopy(GALLERY_COPY, locale);

  const close = () => setActiveIndex(null);
  const previous = () => {
    setSlideDirection("previous");
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  };
  const next = () => {
    setSlideDirection("next");
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null || images.length < 2) return;

    const adjacentIndexes = [
      (activeIndex - 1 + images.length) % images.length,
      (activeIndex + 1) % images.length,
    ];

    adjacentIndexes.forEach((index) => {
      const preload = new window.Image();
      preload.src = modalImageUrl(images[index]);
    });
  }, [activeIndex, images]);

  if (!images.length) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <ProjectVisual locale={locale} title={title} className="aspect-[4/3]" />
        <ProjectVisual locale={locale} title={title} className="aspect-[4/3] opacity-80" />
      </div>
    );
  }

  const activeImage = activeIndex === null ? null : images[activeIndex];
  const activeAlt = activeImage
    ? getLocalizedValue(activeImage.alt, locale) ?? title
    : title;
  const activeCaption = activeImage
    ? getLocalizedValue(activeImage.caption, locale)
    : null;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={`${image.asset?._ref ?? "image"}-${index}`}
            type="button"
            onClick={() => {
              setSlideDirection("next");
              setActiveIndex(index);
            }}
            className="group relative cursor-zoom-in overflow-hidden text-left"
            aria-label={`${copy.openImage}: ${title} ${index + 1}`}
          >
            <ProjectVisual
              image={image}
              locale={locale}
              title={title}
              className="aspect-[4/3]"
            />
            <span className="absolute bottom-4 right-4 z-20 grid size-11 place-items-center bg-charcoal/82 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 className="size-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.modalLabel}
          className="fixed inset-0 z-[100] bg-black/96 text-white"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-white/12 px-4 sm:h-20 sm:px-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/58">
              {copy.image} {activeIndex + 1} {copy.of} {images.length}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label={copy.close}
              className="grid size-11 cursor-pointer place-items-center border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-charcoal"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex h-full items-center justify-center px-4 pb-24 pt-20 sm:px-24 sm:pb-28 sm:pt-24">
            <div
              key={`${activeImage.asset?._ref ?? activeIndex}-${slideDirection}`}
              className={`relative h-full w-full max-w-[1600px] ${
                slideDirection === "next"
                  ? "gallery-slide-next"
                  : "gallery-slide-previous"
              }`}
            >
              <Image
                src={modalImageUrl(activeImage)}
                alt={activeAlt}
                fill
                sizes="100vw"
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={previous}
            aria-label={copy.previous}
            className="absolute left-3 top-1/2 z-30 grid size-12 -translate-y-1/2 cursor-pointer place-items-center border border-white/20 bg-black/35 backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-charcoal sm:left-7 sm:size-14"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={copy.next}
            className="absolute right-3 top-1/2 z-30 grid size-12 -translate-y-1/2 cursor-pointer place-items-center border border-white/20 bg-black/35 backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-charcoal sm:right-7 sm:size-14"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>

          <div className="absolute inset-x-4 bottom-5 z-30 text-center sm:inset-x-24 sm:bottom-7">
            <p className="truncate text-xs tracking-[0.08em] text-white/66">
              {activeCaption ?? activeAlt}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
