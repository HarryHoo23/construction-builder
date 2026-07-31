"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-home-reveal]";
const PARALLAX_SELECTOR = "[data-home-parallax]";

export function HomeMotion() {
  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      revealElements.forEach((element) => {
        element.dataset.revealState = "visible";
      });
      return;
    }

    revealElements.forEach((element) => {
      element.dataset.revealState = "pending";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.revealState = "visible";
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    const observeFrame = window.requestAnimationFrame(() => {
      revealElements.forEach((element) => observer.observe(element));
    });

    let scrollFrame = 0;
    const updateParallax = () => {
      scrollFrame = 0;

      parallaxElements.forEach((element) => {
        const hero = element.closest<HTMLElement>("[data-home-hero]");
        if (!hero) return;

        const rect = hero.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(0, -rect.top / Math.max(rect.height, 1)),
        );

        element.style.setProperty(
          "--home-parallax-y",
          `${(progress * 16).toFixed(2)}px`,
        );
      });
    };

    const requestParallaxUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(observeFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);
    };
  }, []);

  return null;
}
