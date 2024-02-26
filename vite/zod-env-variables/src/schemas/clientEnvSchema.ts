import { envObject, envSchema } from './schema'

const envClient = envSchema.parse(envObject)

export default envClient
