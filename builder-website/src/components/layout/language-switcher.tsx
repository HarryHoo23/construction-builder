"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

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
      className={cn("flex items-center gap-3 text-xs font-semibold tracking-wider", className)}
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
        className={cn("py-2", locale !== "en" && "text-muted hover:text-foreground")}
      >
        EN
      </button>
      <span aria-hidden="true" className="h-3 w-px bg-line" />
      <button
        type="button"
        onClick={() => switchTo("zh")}
        aria-label="切换为简体中文"
        aria-pressed={locale === "zh"}
        className={cn("py-2", locale !== "zh" && "text-muted hover:text-foreground")}
      >
        中文
      </button>
    </div>
  );
}
