import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '@/constants'
import { users } from '@/db/schema'
import db from '@/db'

export const createUser = async (username: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = await db.insert(users).values({ username, password: hashedPassword }).returning()
    return newUser
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
      throw new Error('Unable to create user. Please try again')
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
