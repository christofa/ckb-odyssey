import { ConnectButton } from "@/components/game/connect-button";
import { Logo } from "@/components/game/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <Logo size="text-4xl" />
      <p className="text-muted-foreground">Learn CKB by exploring a pixel-art world.</p>
      <ConnectButton />
    </main>
  );
}