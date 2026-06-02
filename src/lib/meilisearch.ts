import { Meilisearch } from "meilisearch";

declare global {
  // eslint-disable-next-line no-var
  var _meili: Meilisearch | undefined;
}

function getClient() {
  if (!globalThis._meili) {
    globalThis._meili = new Meilisearch({
      host: process.env.MEILISEARCH_HOST!,
      apiKey: process.env.MEILISEARCH_API_KEY,
    });
  }
  return globalThis._meili;
}

export const variantsIndex = new Proxy({} as ReturnType<Meilisearch["index"]>, {
  get(_target, prop) {
    return (getClient().index("variants") as never)[prop as string];
  },
});

export default new Proxy({} as Meilisearch, {
  get(_target, prop) {
    return (getClient() as never)[prop as string];
  },
});
