import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

/**
 * Encryption algorithm
 */
const ALGORITHM = 'aes-256-cbc';

/**
 * Get encryption key from secret
 * Ensures key is 32 bytes for AES-256
 */
function getKey(secret: string): Buffer {
  // Create a 32-byte key from the secret
  const hash = createHash('sha256');
  hash.update(secret);
  return hash.digest();
}

/**
 * Encrypt data using AES-256-CBC
 * @param text Text to encrypt
 * @param secret Secret key for encryption
 * @returns Encrypted text with IV prepended (hex format)
 */
export function encrypt(text: string, secret: string): string {
  const key = getKey(secret);
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Prepend IV to encrypted text
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt data using AES-256-CBC
 * @param encryptedText Encrypted text with IV prepended (hex format)
 * @param secret Secret key for decryption
 * @returns Decrypted text
 */
export function decrypt(encryptedText: string, secret: string): string {
  const key = getKey(secret);
  const parts = encryptedText.split(':');

  if (parts.length !== 2) {
    throw new Error('Invalid encrypted text format');
  }

  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];

  const decipher = createDecipheriv(ALGORITHM, key, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Hash a string using SHA-256
 * @param text Text to hash
 * @returns Hashed text (hex format)
 */
export function hash(text: string): string {
  return createHash('sha256').update(text).digest('hex');
}
