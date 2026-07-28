import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-colors";

const variants = {
  dark: "bg-charcoal text-white hover:bg-accent",
  light: "bg-background text-charcoal hover:bg-white",
  outline:
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white",
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
