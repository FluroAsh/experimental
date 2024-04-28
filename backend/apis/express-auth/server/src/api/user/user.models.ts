import { eq } from 'drizzle-orm'

import db from '@/db'
import { users } from '@/db/schema'

export const createUser = async (username: string, password: string) => {
  try {
    // encrypt password before storing it

    const user = await db.insert(users).values({ username, password }).returning()
    return user
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Username already exists')
    }
    throw Error
  }
}

export const findUser = async (username: string) => {
  const user = await db.select().from(users).where(eq(users.username, username)).limit(1)
  return user
}
