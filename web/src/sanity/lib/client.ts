import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,
  token: readToken,
  perspective: "published",
});
