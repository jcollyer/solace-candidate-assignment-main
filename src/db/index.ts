import * as schema from "@/db/schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        from: () => [],
      }),
    };
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
   const db = drizzle(queryClient, { schema });
  return db;
};

export default setup();
