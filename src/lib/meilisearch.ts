import { Meilisearch } from "meilisearch";

declare global {
  // eslint-disable-next-line no-var
  var _meili: Meilisearch | undefined;
}

const client =
  globalThis._meili ??
  new Meilisearch({
    host: process.env.MEILISEARCH_HOST!,
    apiKey: process.env.MEILISEARCH_API_KEY,
  });

if (process.env.NODE_ENV !== "production") globalThis._meili = client;

export const variantsIndex = client.index("variants");

export default client;
