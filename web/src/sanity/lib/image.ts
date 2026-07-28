import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "../types";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlForImage(source: SanityImage) {
  return builder.image(source);
}
