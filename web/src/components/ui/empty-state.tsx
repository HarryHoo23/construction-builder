import { Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Card className="rounded-none border border-line bg-card py-0 text-center ring-0">
      <CardContent className="px-5 py-14 sm:px-6 sm:py-20">
        <Building2 className="mx-auto mb-5 size-8 text-brand-teal" strokeWidth={1.4} aria-hidden="true" />
        <CardTitle className="display text-2xl font-normal">{title}</CardTitle>
        <CardDescription className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
          {body}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
