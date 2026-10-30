import { defineConfig } from "prisma/config";
import { cliEnv } from "./src/constants/env.cli";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    url: cliEnv.DIRECT_URL,
  },
});
