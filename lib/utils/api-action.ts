import { NextResponse } from 'next/server';
import { ApiResponse, ApiResponseData } from './api-response';
import { verifyApiAuth } from './api-auth';
import { checkRateLimit, getClientIp, RATE_LIMIT_CONFIG } from './rate-limit';

export interface ApiActionConfig {
  request: Request;
  rate_limit?: RATE_LIMIT_CONFIG;
  error?: {
    client: string;
    log: string;
  };
}

export async function apiAction<T extends NextResponse<ApiResponseData>>(
  config: ApiActionConfig,
  callback: (request: Request) => Promise<T>
): Promise<NextResponse<ApiResponseData>> {
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) return ApiResponse.serverError('Server configuration error');

  if (!verifyApiAuth(config.request, secret)) return ApiResponse.unauthorized();

  if (config.rate_limit) {
    const clientIp = getClientIp(config.request);

    const rateLimitResult = checkRateLimit(clientIp, config.rate_limit);

    if (!rateLimitResult.allowed) {
      return ApiResponse.error(
        `Too many requests. Please try again in ${rateLimitResult.resetInSeconds} seconds.`,
        429
      );
    }
  }

  try {
    return await callback(config.request);
  } catch (error) {
    console.error(config.error?.log || 'Something went wrong: ', error);

    return ApiResponse.serverError(config.error?.client || 'Something went wrong');
  }
}
