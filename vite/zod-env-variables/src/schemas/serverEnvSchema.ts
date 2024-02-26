import { generateErrorMessage } from 'zod-error'
import { envObject, envSchema } from './schema'

// You could also just safeParse the client schema
// Usually you would want to have a separate schema for the server
const envServer = envSchema.safeParse(envObject)

if (!envServer.success) {
  const issues = envServer.error.issues

  console.error(
    generateErrorMessage(issues, {
      delimiter: { error: '\n' }
    })
  )
  process.exit(1)
}

export const parsedServerEnv = envServer.data
