import { serial, text, pgSchema, pgTable, varchar } from 'drizzle-orm/pg-core'

export const dbSchema = pgSchema('foo_bar')

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).unique(),
  password: varchar('password', { length: 255 }),
  firstName: text('first_name'),
  lastName: text('last_name')
})
