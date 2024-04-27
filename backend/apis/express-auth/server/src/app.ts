import app from './server'
import chalk from 'chalk'

app.listen(process.env.PORT, () => {
  console.log(
    [
      chalk.bgBlue.black.bold('Server is running on '),
      chalk.bgWhite.black(`\thttp://localhost:${process.env.PORT}\t\t`)
    ].join(' ')
  )
})
