import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
