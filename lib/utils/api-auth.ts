import { encrypt, decrypt } from './encryption';

/**
 * Maximum age of authentication token in milliseconds (5 minutes)
 */
const MAX_TOKEN_AGE = 5 * 60 * 1000;

/**
 * Generate authentication token for API requests
 * Client-side function to create time-based encrypted token
 * @param secret Secret key for encryption
 * @returns Encrypted token
 */
export function generateAuthToken(secret: string): string {
  const timestamp = Date.now().toString();
  return encrypt(timestamp, secret);
}

/**
 * Verify authentication token
 * Server-side function to validate time-based encrypted token
 * @param token Encrypted token to verify
 * @param secret Secret key for decryption
 * @returns True if token is valid and not expired
 */
export function verifyAuthToken(token: string, secret: string): boolean {
  try {
    const decrypted = decrypt(token, secret);
    const timestamp = parseInt(decrypted, 10);

    if (isNaN(timestamp)) {
      return false;
    }

    const now = Date.now();
    const age = now - timestamp;

    // Token must be recent (within MAX_TOKEN_AGE)
    return age >= 0 && age < MAX_TOKEN_AGE;
  } catch {
    // Decryption or parsing failed
    return false;
  }
}

/**
 * Middleware to verify API authentication
 * @param request Request object with headers
 * @param secret Secret key for verification
 * @returns True if authenticated
 */
export function verifyApiAuth(request: Request, secret: string): boolean {
  const authHeader = request.headers.get('X-Auth-Token');

  if (!authHeader) {
    return false;
  }

  return verifyAuthToken(authHeader, secret);
}

/**
 * Create authentication headers for API requests
 * Client-side helper to add auth headers
 * @param secret Secret key
 * @returns Headers object with authentication
 */
export function createAuthHeaders(secret: string): HeadersInit {
  return {
    'X-Auth-Token': generateAuthToken(secret),
    'Content-Type': 'application/json',
  };
}
