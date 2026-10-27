import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const file = process.argv[2];
if (!file) throw new Error("Usage: bun scripts/apply-migration.ts <path-to-migration.sql>");

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await client.executeMultiple(readFileSync(file, "utf8"));
console.log("Applied:", file);