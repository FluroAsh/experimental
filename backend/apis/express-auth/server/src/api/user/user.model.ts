import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

import db from '@/db'
import { users } from '@/db/schema'

export const createUser = async (username: string, password: string) => {
  const SALT_ROUNDS = 10

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await db.insert(users).values({ username, password: hashedPassword }).returning()

    return user
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
      throw new Error('Username already exists')
    }
    throw Error
  }
}

export const findUser = async (username: string) => db.select().from(users).where(eq(users.username, username))

export const validateUser = async (username: string, password: string) => {
  const [user] = await findUser(username)
  if (!user) return false

  return bcrypt.compare(password, user.password)
}
