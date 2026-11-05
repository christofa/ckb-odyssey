export function Logo({ size = "text-xl" }: { size?: string }) {
  return (
    <span className={`font-pixel ${size} text-[var(--odyssey-green)]`}>
      CKB<br />ODYSSEY
    </span>
  );
}