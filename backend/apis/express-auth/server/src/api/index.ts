import { Response, Router } from 'express'
import pkg from 'package.json'

import { userRouter } from '@/api/user'

const router = Router()

router.get('/', (_, res: Response) => {
  res.send({
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    status: '🚀'
  })
})

router.use('/user', userRouter)

export default router
