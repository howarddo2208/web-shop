import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";

const connectionString = z.string().parse(process.env.DATABASE_URL);

const client = postgres(connectionString, { max: 1 });
export const db = drizzle(client);

migrate(db, { migrationsFolder: "drizzle" });
