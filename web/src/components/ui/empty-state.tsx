import { Building2 } from "lucide-react";

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border border-line bg-surface px-6 py-20 text-center">
      <Building2 className="mx-auto mb-5 size-8 text-brand-teal" strokeWidth={1.4} aria-hidden="true" />
      <h3 className="display text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
