import { Config, defineConfig } from "drizzle-kit";

const config: Config = {
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  // driver: "pg",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  migrations: {
    table: 'advocates-table',
  },
  verbose: true,
  strict: true,
};

export default defineConfig(config);