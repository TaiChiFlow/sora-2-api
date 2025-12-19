import {
  SoraTwoApiError,
  SoraTwoTaskDetailResponse,
  SoraTwoVideoGenerationRequest,
  SoraTwoVideoGenerationResponse,
} from './types';

export type SoraTwoClientOptions = {
  baseUrl: string;
  apiKey: string;
  fetchImpl?: typeof fetch;
};

export type SoraTwoClient = {
  createVideo: (input: SoraTwoVideoGenerationRequest) => Promise<SoraTwoVideoGenerationResponse>;
  getTask: (id: string) => Promise<SoraTwoTaskDetailResponse>;
};

const joinUrl = (baseUrl: string, path: string) =>
  `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

const json = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
};

export function createSoraTwoClient(options: SoraTwoClientOptions): SoraTwoClient {
  const fetcher = options.fetchImpl ?? fetch;
  const baseUrl = options.baseUrl;

  if (!baseUrl) throw new SoraTwoApiError('baseUrl is required');
  if (!options.apiKey) throw new SoraTwoApiError('apiKey is required');

  const request = async <T>(path: string, init: RequestInit): Promise<T> => {
    const res = await fetcher(joinUrl(baseUrl, path), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${options.apiKey}`,
        ...(init.headers ?? {}),
      },
    });

    if (!res.ok) {
      let message = `Request failed with status ${res.status}`;
      try {
        const maybe = await json<{ error?: string; message?: string }>(res);
        message = maybe.error ?? maybe.message ?? message;
      } catch {
        // ignore
      }
      throw new SoraTwoApiError(message, res.status);
    }

    return json<T>(res);
  };

  return {
    createVideo: input =>
      request<SoraTwoVideoGenerationResponse>('v1/videos/generations', {
        method: 'POST',
        body: JSON.stringify({ model: 'sora-2', ...input }),
      }),
    getTask: id =>
      request<SoraTwoTaskDetailResponse>(`v1/tasks/${encodeURIComponent(id)}`, { method: 'GET' }),
  };
}
