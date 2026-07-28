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
        "relative py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:text-accent",
        active &&
          "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current",
        className,
      )}
    >
      {children}
    </Link>
  );
}
