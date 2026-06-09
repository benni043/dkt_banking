import { SSE } from "sse.js";

export async function useSSE(url: string): Promise<SSE> {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  return new SSE(`${apiBase}${url}`);
}
