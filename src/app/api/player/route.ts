import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionPlayerId } from "@/lib/auth";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(20),
  avatar: z.enum(["builder-1", "builder-2", "builder-3", "builder-4"]),
});

export async function POST(req: Request) {
  const playerId = await getSessionPlayerId();
  if (!playerId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { name, avatar } = parsed.data;
  const player = await prisma.player.upsert({
    where: { id: playerId },
    update: { name, avatar },
    create: { id: playerId, name, avatar },
  });
  return NextResponse.json({ player });
}