import type { Metadata } from "next";
import { VaultClient } from "@/components/vault-client";

export const metadata: Metadata = {
  title: "Vault",
};

export default function VaultPage() {
  return <VaultClient />;
}
