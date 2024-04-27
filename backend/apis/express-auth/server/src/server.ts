import express from 'express'
import apiRouters from '@/api'

// TODO: Add a middleware function to initialize neccessay app middleware
const app = express()

app.use(express.json())
app.use('/', apiRouters)

export default app
