import { NextResponse } from 'next/server';
import { ApiResponse, ApiResponseData } from './api-response';
import { verifyApiAuth } from './api-auth';
import { serverEnv } from '@/lib/env/server';

export interface ApiActionConfig<T extends NextResponse<ApiResponseData>> {
  request: Request;
  error?: { client: string; log: string };
  callback: () => Promise<T>;
}

export async function apiAction<T extends NextResponse<ApiResponseData>>(
  payload: ApiActionConfig<T>
): Promise<NextResponse<ApiResponseData>> {
  const secret = serverEnv.INTERNAL_API_SECRET;

  if (!secret) return ApiResponse.serverError('Server configuration error');

  if (!verifyApiAuth(payload.request, secret)) return ApiResponse.unauthorized();

  try {
    return await payload.callback();
  } catch (error) {
    console.error(payload.error?.log || 'Something went wrong: ', error);

    return ApiResponse.serverError(payload.error?.client || 'Something went wrong');
  }
}
