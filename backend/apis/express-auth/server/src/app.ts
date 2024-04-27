import express from 'express'
import chalk from 'chalk'

import { authRouter, rootRouter } from './routes'

/**
 * What I want to do:
 * 1. Create an Express server that will authenticate users using A JSON Web Token (JWT)
 * 2. Create an Express server that will authenticate users using a session token & cookie
 * - This will require a Database implementation to store user sessions
 */

const app = express()
const PORT = 3005

// Middleware example, this will run on every request
app.use((_req, _res, next) => {
  console.log('Middleware is running')
  next()
})

app.use('/', rootRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(
    [chalk.bgBlue.black.bold('Server is running on '), chalk.bgWhite.black(`\thttp://localhost:${PORT}\t\t`)].join(' ')
  )
})
