import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionPlayerId } from "@/lib/auth";

export async function GET() {
  const playerId = await getSessionPlayerId();
  if (!playerId) return NextResponse.json({ playerId: null, player: null });
  const player = await prisma.player.findUnique({ where: { id: playerId } });
  return NextResponse.json({ playerId, player });
}