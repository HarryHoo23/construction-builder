"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { NavLink } from "./nav-link";

type Labels = {
  home: string;
  projects: string;
  services: string;
  about: string;
  contact: string;
  cta: string;
  menu: string;
  close: string;
};

export function MobileNavigation({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Labels;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="grid size-11 place-items-center"
        aria-label={open ? labels.close : labels.menu}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open ? (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-[73px] z-40 flex h-[calc(100dvh-73px)] flex-col bg-background px-5 pb-8 pt-8"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {[
              ["/", labels.home],
              ["/projects", labels.projects],
              ["/services", labels.services],
              ["/about", labels.about],
              ["/contact", labels.contact],
            ].map(([href, label]) => (
              <NavLink
                key={href}
                href={href as "/" | "/projects" | "/services" | "/about" | "/contact"}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 text-base"
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <LanguageSwitcher
            locale={locale}
            onNavigate={() => setOpen(false)}
            className="mt-6"
          />
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-auto flex min-h-14 items-center justify-center bg-charcoal px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            {labels.cta}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
