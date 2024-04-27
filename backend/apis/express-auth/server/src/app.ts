import express from 'express'
import chalk from 'chalk'

import apiRouters from '@/api'

const app = express()

// Middleware example, this will run on every request
app.use((_req, _res, next) => {
  console.log('Middleware is running')
  next()
})

app.use('/', apiRouters)

app.listen(process.env.PORT, () => {
  console.log(
    [
      chalk.bgBlue.black.bold('Server is running on '),
      chalk.bgWhite.black(`\thttp://localhost:${process.env.PORT}\t\t`)
    ].join(' ')
  )
})
