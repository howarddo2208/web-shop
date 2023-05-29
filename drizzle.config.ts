import "dotenv/config"
import type { Config } from "drizzle-kit";

const config: Config = {
  schema: 'db/schema.ts',
  connectionString: process.env.DB_URL
}

export default config
