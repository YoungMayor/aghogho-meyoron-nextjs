export interface ApiSuccessResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  details?: unknown;
  statusCode: number;
}
