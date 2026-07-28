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
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch {
    return fallback;
  }
}
