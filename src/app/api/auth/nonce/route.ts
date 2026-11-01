import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMessage } from "@/lib/auth";

export async function POST(req: Request) {
  const { address } = await req.json();
  if (typeof address !== "string" || address.length < 10) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  const nonce = randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await prisma.authNonce.upsert({
    where: { address },
    update: { nonce, expiresAt },
    create: { address, nonce, expiresAt },
  });

  return NextResponse.json({ message: buildMessage(address, nonce) });
}