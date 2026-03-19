interface RateLimitConfig {
  maxRequests: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  resetInSeconds: number;
  remaining: number;
}

export const RATE_LIMITS = {
  FORM_SUBMISSION: { maxRequests: 5, windowSeconds: 60 } as RateLimitConfig,
};

// In-memory store for rate limiting.
// Limitations in serverless/edge deployments:
// - State is not shared across concurrent instances or pods.
// - Memory grows unbounded; entries are only evicted when re-accessed after expiry.
// - Resets on each cold start.
// For production at scale, replace with a Redis-backed solution (e.g., Upstash).
const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      resetInSeconds: config.windowSeconds,
      remaining: config.maxRequests - 1,
    };
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
      remaining: 0,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
    remaining: config.maxRequests - entry.count,
  };
}
