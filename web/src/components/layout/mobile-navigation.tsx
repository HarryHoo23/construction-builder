"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { NavLink } from "./nav-link";
import { ACCESSIBILITY_COPY } from "@/lib/copy";

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

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels.menu}
            />
          }
        >
          <Menu aria-hidden="true" />
        </SheetTrigger>
        <SheetContent
          id="mobile-navigation"
          side="right"
          aria-label={labels.menu}
          className="w-full max-w-none overflow-y-auto overscroll-contain rounded-none border-line bg-background px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 shadow-2xl data-[side=right]:w-full sm:max-w-sm sm:data-[side=right]:w-3/4"
        >
          <SheetTitle className="sr-only">{labels.menu}</SheetTitle>
          <SheetDescription className="sr-only">
            {ACCESSIBILITY_COPY.mobileNavigation}
          </SheetDescription>
          <nav aria-label={ACCESSIBILITY_COPY.mobileNavigation} className="flex flex-col">
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
            className={cn(buttonVariants({ size: "lg" }), "mt-auto w-full")}
          >
            {labels.cta}
          </Link>
        </SheetContent>
      </Sheet>
    </div>
  );
}
