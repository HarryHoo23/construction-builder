import { Link } from "@/i18n/navigation";

export function Logo({ companyName }: { companyName: string }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={companyName}>
      <span
        className="grid size-9 grid-cols-2 gap-[3px] border border-current p-1.5"
        aria-hidden="true"
      >
        <span className="bg-current" />
        <span className="border border-current" />
        <span className="border border-current" />
        <span className="bg-current" />
      </span>
      <span className="max-w-40 text-[11px] font-semibold uppercase leading-4 tracking-[0.18em]">
        {companyName}
      </span>
    </Link>
  );
}
