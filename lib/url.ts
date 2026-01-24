import { headers } from "next/headers";

export function getBaseUrl() {
  const host = headers().get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
