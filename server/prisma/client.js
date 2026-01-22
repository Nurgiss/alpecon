import { PrismaClient } from '@prisma/client';

// Create a single instance of PrismaClient
// This prevents multiple instances and ensures efficient connection pooling
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
