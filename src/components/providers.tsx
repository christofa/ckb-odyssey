"use client";

import { ccc } from "@ckb-ccc/connector-react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ccc.Provider name="CKB Odyssey">{children}</ccc.Provider>;
}