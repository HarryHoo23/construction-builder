import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 border px-6 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-200";

const variants = {
  dark: "border-charcoal bg-charcoal text-white hover:border-brand-red hover:bg-brand-red",
  light: "border-background bg-background text-charcoal hover:border-white hover:bg-white",
  outline:
    "border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-white",
};

export function Button({
  className,
  variant = "dark",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "dark",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof variants;
}) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}
