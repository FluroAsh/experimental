import express from 'express'
import chalk from 'chalk'

import apiRouters from '@/api'

// TODO: Add a middleware function to initialize neccessay app middleware
const app = express()
app.use(express.json())

app.use('/', apiRouters)

app.listen(process.env.PORT, () => {
  console.log(
    [
      chalk.bgBlue.black.bold('Server is running on '),
      chalk.bgWhite.black(`\thttp://localhost:${process.env.PORT}\t\t`)
    ].join(' ')
  )
})
