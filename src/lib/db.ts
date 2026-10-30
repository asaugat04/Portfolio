import "server-only";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";
import { serverEnv } from "@/constants/env.server";

const globalDb = globalThis as unknown as { portfolioDb?: PrismaClient };
export function getDb() {
  if (globalDb.portfolioDb) return globalDb.portfolioDb;
  const db = new PrismaClient({
    transactionOptions: { maxWait: 10000, timeout: 10000 },
    adapter: new PrismaNeon({ connectionString: serverEnv.DATABASE_URL }),
  });
  globalDb.portfolioDb = db;
  return db;
}
