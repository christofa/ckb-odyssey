"use client";

import { useEffect, useState } from "react";
import { ccc } from "@ckb-ccc/connector-react";
import { Button } from "@/components/ui/button";

const post = (url: string, body?: unknown) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });

export function ConnectButton() {
  const { open, disconnect } = ccc.useCcc();
  const signer = ccc.useSigner();
  const [address, setAddress] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setSignedIn(!!d.playerId));
  }, []);

  useEffect(() => {
    let cancelled = false;
    signer?.getRecommendedAddress().then((a) => {
      if (!cancelled) setAddress(a);
    });
    return () => {
      cancelled = true;
    };
  }, [signer]);

  const shownAddress = signer ? address : "";

  async function signIn() {
    if (!signer) return;
    setBusy(true);
    try {
      const addr = await signer.getRecommendedAddress();
      const { message } = await (await post("/api/auth/nonce", { address: addr })).json();
      const signature = await signer.signMessage(message);
      const res = await post("/api/auth/verify", { address: addr, signature });
      if (!res.ok) throw new Error((await res.json()).error);
      const { isNew } = await res.json();
      setSignedIn(true);
      console.log("Signed in. New player?", isNew, "identity:", signature.identity);
    } catch (e) {
      console.error("Sign-in failed:", e);
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await post("/api/auth/logout");
    setSignedIn(false);
    disconnect();
  }

  if (!signer) return <Button onClick={open}>Connect Wallet</Button>;
  if (!signedIn)
    return (
      <Button onClick={signIn} disabled={busy}>
        {busy ? "Check your wallet…" : "Sign in"}
      </Button>
    );

  return (
    <Button variant="outline" onClick={signOut}>
      {shownAddress.slice(0, 8)}…{shownAddress.slice(-6)} · Sign out
    </Button>
  );
}