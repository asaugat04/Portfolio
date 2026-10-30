import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import { cliEnv } from "../src/constants/env.cli";
import { seedContent } from "../prisma/seed/content";
import { contentSchemas } from "../src/schemas/content";

const db = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: cliEnv.DATABASE_URL }),
});
try {
  const result = await db.contentEntry.createMany({
    data: Object.values(seedContent)
      .flat()
      .map((entry) => ({
        ...entry,
        data: contentSchemas[entry.section].parse(entry.data),
      })),
    skipDuplicates: true,
  });
  console.log(
    `Imported ${result.count} portfolio entries. Existing content was preserved.`,
  );
} finally {
  await db.$disconnect();
}
