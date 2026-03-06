import { NextResponse } from 'next/server';
import { ApiResponse, ApiResponseData } from './api-response';
import { verifyApiAuth } from './api-auth';
import { checkRateLimit, RATE_LIMIT_CONFIG } from './rate-limit';
import { serverEnv } from '@/lib/env/server';
import { requestTools } from './request-tools';

export interface ApiActionConfig<T extends NextResponse<ApiResponseData>> {
  request: Request;
  rate_limit?: RATE_LIMIT_CONFIG;
  error?: { client: string; log: string };
  callback: () => Promise<T>;
}

export async function apiAction<T extends NextResponse<ApiResponseData>>(
  payload: ApiActionConfig<T>
): Promise<NextResponse<ApiResponseData>> {
  const secret = serverEnv.INTERNAL_API_SECRET;

  if (!secret) return ApiResponse.serverError('Server configuration error');

  if (!verifyApiAuth(payload.request, secret)) return ApiResponse.unauthorized();

  if (payload.rate_limit) {
    const { ipAddress } = requestTools(payload.request);

    const rateLimitResult = checkRateLimit(ipAddress, payload.rate_limit);

    if (!rateLimitResult.allowed) {
      return ApiResponse.error(
        `Too many requests. Please try again in ${rateLimitResult.resetInSeconds} seconds.`,
        429
      );
    }
  }

  try {
    return await payload.callback();
  } catch (error) {
    console.error(payload.error?.log || 'Something went wrong: ', error);

    return ApiResponse.serverError(payload.error?.client || 'Something went wrong');
  }
}
