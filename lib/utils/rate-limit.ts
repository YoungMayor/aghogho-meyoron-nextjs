/**
 * Simple in-memory rate limiter for API endpoints
 * Tracks requests by IP address to prevent abuse and DDOS attacks
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (per IP)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Track last cleanup time for lazy cleanup
let lastCleanupTime = Date.now();
const CLEANUP_INTERVAL = 60000; // 1 minute

/**
 * Lazy cleanup function - only runs when needed
 * This prevents memory leaks in serverless environments
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  
  // Only run cleanup if enough time has passed since last cleanup
  if (now - lastCleanupTime < CLEANUP_INTERVAL) {
    return;
  }
  
  lastCleanupTime = now;
  
  // Remove expired entries
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed within the window
   */
  maxRequests: number;

  /**
   * Time window in seconds
   */
  windowSeconds: number;
}

export interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  allowed: boolean;

  /**
   * Number of requests remaining in the current window
   */
  remaining: number;

  /**
   * Time in seconds until the rate limit resets
   */
  resetInSeconds: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (e.g., IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  // Run lazy cleanup on each check (serverless-friendly)
  cleanupExpiredEntries();
  
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;

  // Get or create entry
  let entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired entry
    entry = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(identifier, entry);
  }

  // Increment count
  entry.count++;

  // Calculate result
  const allowed = entry.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);
  const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);

  return {
    allowed,
    remaining,
    resetInSeconds,
  };
}

/**
 * Get the client's IP address from the request
 * @param request - Next.js request object
 * @returns IP address or 'unknown'
 */
export function getClientIp(request: Request): string {
  // Check various headers for the real IP address
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return 'unknown';
}

/**
 * Default rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Strict limit for form submissions (contact, mentorship)
  FORM_SUBMISSION: {
    maxRequests: 3,
    windowSeconds: 300, // 5 minutes
  },

  // Moderate limit for API data endpoints
  API_READ: {
    maxRequests: 60,
    windowSeconds: 60, // 1 minute
  },

  // Very strict limit for authentication attempts
  AUTH: {
    maxRequests: 5,
    windowSeconds: 900, // 15 minutes
  },
} as const;
