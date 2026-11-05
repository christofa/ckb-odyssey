export function PixelPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`pixel-border bg-[var(--odyssey-panel)] p-4 ${className}`}>{children}</div>
  );
}