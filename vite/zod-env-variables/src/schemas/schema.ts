import { z } from 'zod'
// Inspiration taken from: https://catalins.tech/validate-environment-variables-with-zod/

const clientPrefix = 'VITE_'
const isNode = typeof import.meta.env === 'undefined'
const env = (varName: string) =>
  isNode
    ? process.env[`${clientPrefix}${varName}`] ?? process.env[varName]
    : import.meta.env[`${clientPrefix}${varName}`]

const envSchema = z.object({
  FIRST_NAME: z.string(),
  LAST_NAME: z.string().trim(),
  AGE: z.number().optional(),
  LOCAL_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
})

const envObject = {
  FIRST_NAME: env('FIRST_NAME'),
  LAST_NAME: env('LAST_NAME'),
  AGE: env('AGE') ? parseInt(env('AGE')) : undefined,
  LOCAL_URL: env('LOCAL_URL'),
  NODE_ENV: env('NODE_ENV')
}

export { envObject, envSchema, isNode, env }
