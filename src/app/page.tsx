import { ConnectButton } from "@/components/game/connect-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">CKB Odyssey</h1>
      <p className="text-muted-foreground">Learn CKB by exploring a pixel-art world.</p>
      <ConnectButton />
    </main>
  );
}