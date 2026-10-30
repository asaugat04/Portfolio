import "server-only";
import { createHmac } from "node:crypto";
import { getDb } from "@/lib/db";
import { serverEnv } from "@/constants/env.server";
import { HttpError } from "@/lib/api/errors";

export async function rateLimit(
  key: string,
  max: number,
  windowSeconds: number,
) {
  const id = createHmac("sha256", serverEnv.RATE_LIMIT_SECRET)
    .update(key)
    .digest("hex");
  const expiresAt = new Date(Date.now() + windowSeconds * 1000);
  const rows = await getDb().$queryRaw<{ count: number }[]>`
    INSERT INTO "RateLimit" ("id", "count", "expiresAt") VALUES (${id}, 1, ${expiresAt})
    ON CONFLICT ("id") DO UPDATE SET
      "count" = CASE WHEN "RateLimit"."expiresAt" <= NOW() THEN 1 ELSE "RateLimit"."count" + 1 END,
      "expiresAt" = CASE WHEN "RateLimit"."expiresAt" <= NOW() THEN ${expiresAt} ELSE "RateLimit"."expiresAt" END
    RETURNING "count"
  `;
  if (rows[0].count > max)
    throw new HttpError(429, "Too many requests. Please try again later.");
  // Expired buckets contain only keyed hashes, never raw IP addresses.
  await getDb().rateLimit.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
}
