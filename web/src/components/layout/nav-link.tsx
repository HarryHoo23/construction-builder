"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
  onClick,
  className,
}: {
  href: "/" | "/projects" | "/services" | "/about" | "/contact";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative py-3 text-[11px] font-semibold uppercase tracking-[0.17em] text-charcoal/70 transition-colors hover:text-charcoal",
        active &&
          "text-charcoal after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-brand-red",
        className,
      )}
    >
      {children}
    </Link>
  );
}
