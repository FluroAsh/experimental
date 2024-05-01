import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '@/constants'
import { users } from '@/db/schema'
import db from '@/db'

export const createUser = async (username: string, password: string, firstName: string, lastName: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = await db
      .insert(users)
      .values({ username, password: hashedPassword, firstName, lastName })
      .returning()
    return newUser
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Unable to create user. Please try again.')
    }
    throw Error
  }
}

/** Attempts to find a user by their `id` or `username`. */
export const findUser = async (param: string, matcher: 'id' | 'username' = 'username') =>
  db
    .select()
    .from(users)
    .where(eq(matcher === 'id' ? users.id : users.username, param))

export const validateUser = async (username: string, password: string) => {
  const [user] = await findUser(username)
  if (!user) return false

  return bcrypt.compare(password, user.password)
}
