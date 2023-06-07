import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import { env } from '@/env.mjs'
import * as schema from '@/db/schema'

// create the connection
const connection = connect({
  host: env.DB_HOST,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
})

export const db = drizzle(connection, { schema })
