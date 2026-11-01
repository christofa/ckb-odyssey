import { NextResponse } from "next/server";
import { ccc } from "@ckb-ccc/core";
import { prisma } from "@/lib/prisma";
import { buildMessage, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { address, signature } = await req.json();
  if (typeof address !== "string" || !signature) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const record = await prisma.authNonce.findUnique({ where: { address } });
  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ error: "Challenge expired" }, { status: 401 });
  }

  // Rebuild the message on the server. Never trust one sent by the client.
  const message = buildMessage(address, record.nonce);

  const valid = await ccc.Signer.verifyMessage(message, signature);
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // One-time use
  await prisma.authNonce.delete({ where: { address } });

  // The player ID is what the signature actually proves
  const playerId: string = signature.identity;
  await createSession(playerId);

  const player = await prisma.player.findUnique({ where: { id: playerId } });
  return NextResponse.json({ isNew: !player });
}