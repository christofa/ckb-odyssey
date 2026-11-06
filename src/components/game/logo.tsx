import { pixel } from "@/lib/fonts";

export function Logo({ size = "text-xl" }: { size?: string }) {
  return (
    <span className={`${pixel.className} ${size} text-center leading-relaxed text-[var(--odyssey-green)]`}>
      CKB<br />ODYSSEY
    </span>
  );
}