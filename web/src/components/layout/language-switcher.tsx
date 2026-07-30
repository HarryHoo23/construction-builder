"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ACCESSIBILITY_COPY } from "@/lib/copy";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher({
  locale,
  onNavigate,
  className,
}: {
  locale: Locale;
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
    onNavigate?.();
  };

  return (
    <div
      className={cn(
        "grid h-11 grid-cols-2 items-stretch overflow-hidden rounded-full border border-line bg-surface text-[10px] font-semibold tracking-widest",
        className,
      )}
      role="radiogroup"
      aria-label={ACCESSIBILITY_COPY.languageSelection}
    >
      <Button
        type="button"
        role="radio"
        variant="ghost"
        size="sm"
        onClick={() => switchTo("en")}
        aria-label={ACCESSIBILITY_COPY.switchToEnglish}
        aria-checked={locale === "en"}
        className={cn(
          "h-full rounded-none border-0 px-4 py-0 text-[10px] tracking-[0.1em] shadow-none transition-colors focus-visible:border-0",
          locale === "en" ? "bg-stone text-charcoal" : "text-muted hover:text-foreground",
        )}
      >
        EN
      </Button>
      <Button
        type="button"
        role="radio"
        variant="ghost"
        size="sm"
        onClick={() => switchTo("zh")}
        aria-label={ACCESSIBILITY_COPY.switchToChinese}
        aria-checked={locale === "zh"}
        className={cn(
          "h-full rounded-none border-0 px-4 py-0 text-[10px] tracking-widest shadow-none transition-colors focus-visible:border-0",
          locale === "zh" ? "bg-stone text-charcoal" : "text-muted hover:text-foreground",
        )}
      >
        中文
      </Button>
    </div>
  );
}
