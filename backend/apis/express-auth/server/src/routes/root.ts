import { Response, Router } from 'express'
import pkg from 'package.json'

const router = Router()

router.get('/', (_, res: Response) => {
  res.send({
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    status: '🚀'
  })
})

export default router
