import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    // Return a proper mock that matches Drizzle's interface
    const mockDb = {
      select: (fields?: any) => ({
        from: (table: any) => ({
          where: (condition: any) => ({
            limit: (limit: number) => ({
              offset: (offset: number) => Promise.resolve([])
            }),
            then: (callback: any) => Promise.resolve([]).then(callback)
          }),
          limit: (limit: number) => ({
            offset: (offset: number) => Promise.resolve([])
          }),
          then: (callback: any) => Promise.resolve([]).then(callback)
        })
      })
    };
    return mockDb as any;
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient, { schema });
  return db;
};

export default setup();

