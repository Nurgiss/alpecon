import { randomBytes } from 'crypto';

/**
 * Generate a secure JWT secret
 * Run this script with: npx tsx scripts/generate-jwt-secret.ts
 */
function generateJWTSecret(length: number = 64): string {
  return randomBytes(length).toString('base64');
}

console.log('\n🔐 Generate a secure JWT secret for your .env file:\n');
console.log('JWT_SECRET=' + generateJWTSecret());
console.log('\n⚠️  Copy this value to your .env file and keep it secret!\n');
