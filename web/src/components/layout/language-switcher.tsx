"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ACCESSIBILITY_COPY } from "@/lib/copy";

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
      className={cn("flex items-center rounded-full border border-line bg-surface p-1 text-[10px] font-semibold tracking-[0.1em]", className)}
      aria-label={ACCESSIBILITY_COPY.languageSelection}
    >
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-label={ACCESSIBILITY_COPY.switchToEnglish}
        aria-pressed={locale === "en"}
        className={cn(
          "rounded-full px-3 py-1.5 transition-colors",
          locale === "en" ? "bg-stone text-charcoal" : "text-muted hover:text-foreground",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchTo("zh")}
        aria-label={ACCESSIBILITY_COPY.switchToChinese}
        aria-pressed={locale === "zh"}
        className={cn(
          "rounded-full px-3 py-1.5 transition-colors",
          locale === "zh" ? "bg-stone text-charcoal" : "text-muted hover:text-foreground",
        )}
      >
        中文
      </button>
    </div>
  );
}
