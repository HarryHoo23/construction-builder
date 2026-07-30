import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BRAND_COPY } from "@/lib/copy";

export function Logo({ companyName }: { companyName: string }) {
  return (
    <Link href="/" className="group flex items-center gap-3.5" aria-label={companyName}>
      <span className="grid size-11 shrink-0 place-items-center overflow-hidden bg-white/65">
        <Image
          src="/images/hongwei-logo.png"
          width={575}
          height={545}
          alt=""
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="leading-none">
        <span className="display block text-[20px] tracking-[0.1em]">{BRAND_COPY.wordmark}</span>
        <span className="mt-1.5 block text-[8px] font-medium uppercase tracking-[0.34em] opacity-50">
          {BRAND_COPY.descriptor}
        </span>
      </span>
    </Link>
  );
}
