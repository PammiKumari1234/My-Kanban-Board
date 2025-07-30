import { PrismaClient } from "@prisma/client";

// Declare a global variable to store the PrismaClient instance.
// This is necessary to prevent multiple instances of PrismaClient in development,
// which can happen due to Next.js hot reloading.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize PrismaClient.
// If a global instance already exists, use it; otherwise, create a new one.
export const prisma = global.prisma || new PrismaClient({
  log: ['query'], // Optional: logs all database queries to the console
});

// In development, store the PrismaClient instance globally to reuse it.
// This prevents the "too many PrismaClient instances" warning.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
