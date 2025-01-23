export interface ApiResponse<T> {
  error?: boolean;
  message?: string;
  data: T;
}

export interface RequestOptions {
  method: string;
  headers: Headers;
  body?: string;
}

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiResponseJson<T> {
  data: T | null;
}
