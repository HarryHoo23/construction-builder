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
      <h2 className="display break-words text-4xl leading-[1.03] sm:text-5xl lg:text-[4rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:mt-7 sm:text-lg sm:leading-8">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
