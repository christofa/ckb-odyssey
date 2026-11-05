export function XpBar({ xp, max }: { xp: number; max: number }) {
  const pct = Math.min(100, Math.round((xp / max) * 100));
  return (
    <div>
      <div className="h-3 w-full bg-black/60 pixel-border">
        <div className="h-full bg-[var(--odyssey-green)]" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-right font-pixel text-[10px]">{xp} / {max} XP</p>
    </div>
  );
}