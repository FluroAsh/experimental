import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not found on .env')
}

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
})

await client.connect()
const db = drizzle(client)

export default db
