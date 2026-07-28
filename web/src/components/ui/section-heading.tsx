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
    <div className={cn("max-w-4xl", className)}>
      {eyebrow ? (
        <p className="eyebrow mb-5">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display text-4xl leading-[1.03] sm:text-5xl lg:text-[4rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
