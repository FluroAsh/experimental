import { drizzle } from 'drizzle-orm/node-postgres'
import { faker } from '@faker-js/faker'
import pg from 'pg'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '@/constants'
import { users } from './schema'
import { sql } from 'drizzle-orm'
import chalk from 'chalk'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not found on .env')
}

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
})

await client.connect()
const db = drizzle(client)

// WARNING: Truncate "Users" table & restart identity (hard reset for development purposes)
await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY`)

let data: (typeof users.$inferInsert)[] = []
const RANDOM_USER_COUNT = 10

const defaultUsers = [
  { username: 'admin', password: await bcrypt.hash('ubersecurepassword', SALT_ROUNDS) },
  { username: 'mrthompson', password: await bcrypt.hash('Password!123', SALT_ROUNDS) }
] satisfies (typeof users.$inferInsert)[]

for (let i = 0; i < RANDOM_USER_COUNT; i++) {
  const username = faker.internet.userName()
  const password = await bcrypt.hash(faker.internet.password(), SALT_ROUNDS)
  data.push({ username, password })
}

data = [...defaultUsers, ...data]

console.log(chalk.bgYellow.bold('[server]: Seeding database...'))

await db
  .insert(users)
  .values(data)
  .catch((e) => {
    throw new Error('Error seeding database', e)
  })

console.log(chalk.bgGreen.bold('[server]: Database seeded successfully!'))
await client.end()
