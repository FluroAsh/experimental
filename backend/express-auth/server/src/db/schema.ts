import { serial, text, pgSchema, pgTable } from 'drizzle-orm/pg-core'

export const dbSchema = pgSchema('foo_bar')

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull()
})
