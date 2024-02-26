import { z } from 'zod'
import { envSchema } from './schemas/schema'

type envSchemaType = z.infer<typeof envSchema>

declare global {
  namespace NodeJS {
    // @ts-expect-error - The age type is a number, but is not yet parsed as such
    interface ProcessEnv extends envSchemaType {}
  }
}
