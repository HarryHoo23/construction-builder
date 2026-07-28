import type { QueryParams } from "next-sanity";
import { isSanityConfigured } from "../env";
import { client } from "./client";

export async function safeSanityFetch<T>({
  query,
  params = {},
  fallback,
}: {
  query: string;
  params?: QueryParams;
  fallback: T;
}): Promise<T> {
  if (!isSanityConfigured) return fallback;

  try {
    const result = await client.fetch<T | null>(query, params, {
      next: { revalidate: 60 },
    });
    return result ?? fallback;
  } catch {
    return fallback;
  }
}
