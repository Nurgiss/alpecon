import bcrypt from 'bcrypt';

/**
 * Hash a password using bcrypt
 * Run this script with: npx tsx scripts/hash-password.ts <password>
 */
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  const password = process.argv[2];

  if (!password) {
    console.error('\n❌ Error: Please provide a password to hash\n');
    console.log('Usage: npm run hash:password <password>');
    console.log('Example: npm run hash:password "MySecureP@ssw0rd"\n');
    process.exit(1);
  }

  console.log('\n🔐 Hashing password...\n');
  const hashedPassword = await hashPassword(password);
  console.log('Hashed password for your .env file:');
  console.log('ADMIN_PASSWORD=' + hashedPassword);
  console.log('\n⚠️  This is a bcrypt hash. Update your .env file with this value.\n');
}

main().catch(console.error);
