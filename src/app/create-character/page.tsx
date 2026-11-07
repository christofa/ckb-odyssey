"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AVATARS = ["builder-1", "builder-2", "builder-3", "builder-4"];

export default function CreateCharacter() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState("");

  async function save() {
    setError("");
    const res = await fetch("/api/player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, avatar }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return setError(data.error ?? `Request failed (${res.status})`);
    }
    router.push("/map");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Create your builder</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Builder name"
        className="rounded-md border bg-transparent p-3"
      />
      <div className="grid grid-cols-4 gap-2">
        {AVATARS.map((a) => (
          <button
            key={a}
            onClick={() => setAvatar(a)}
            className={`rounded-md border p-4 text-xs ${avatar === a ? "border-green-400" : ""}`}
          >
            {a}
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button onClick={save}>Start Odyssey</Button>
    </main>
  );
}
