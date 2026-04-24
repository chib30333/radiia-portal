export type ApiRequestOptions = RequestInit & {
  query?: Record<string, string | number | boolean | undefined>;
};

function withQuery(input: string, query?: ApiRequestOptions["query"]) {
  if (!query) {
    return input;
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const queryString = params.toString();
  return queryString ? `${input}?${queryString}` : input;
}

export async function apiClient<T>(
  input: string,
  { query, headers, ...init }: ApiRequestOptions = {}
): Promise<T> {
  const response = await fetch(withQuery(input, query), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
