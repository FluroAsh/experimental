import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import apiRouters from '@/api'

const app = express()

// TODO: Add a middleware function to initialize neccessay app middleware
app.use(express.json())
app.use(
  cors({
    origin: '*'
  })
)
app.use('/', apiRouters)

export default app
