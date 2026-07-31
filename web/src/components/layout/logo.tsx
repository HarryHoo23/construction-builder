import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BRAND_COPY } from "@/lib/copy";

export function Logo({ companyName }: { companyName: string }) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3 sm:gap-3.5" aria-label={companyName}>
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden bg-white/65 sm:size-11">
        <Image
          src="/images/hongwei-logo.png"
          width={575}
          height={545}
          alt=""
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="min-w-0 leading-none">
        <span className="display block text-lg tracking-[0.1em] sm:text-[20px]">{BRAND_COPY.wordmark}</span>
        <span className="mt-1.5 block text-[7px] font-medium uppercase tracking-[0.28em] opacity-50 sm:text-[8px] sm:tracking-[0.34em]">
          {BRAND_COPY.descriptor}
        </span>
      </span>
    </Link>
  );
}
