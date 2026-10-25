import Image from 'next/image';

/** The compass-and-house mark from the approved logo, without the wordmark. */
export function BrandMark({ className = 'h-7 w-7' }: { className?: string }) {
  return <Image src="/brand/compass-mark.png" alt="" width={512} height={494} className={className} aria-hidden="true" />;
}
