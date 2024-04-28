import db from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const createUser = async (username: string, password: string) => {
  // encrypt password before storing it

  const user = await db.insert(users).values({ username, password }).returning()
  return user
}

export const findUser = async (username: string) => {
  const user = await db.select().from(users).where(eq(users.username, username)).limit(1)
  return user
}
