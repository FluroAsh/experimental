import { Response, Router } from 'express'
import pkg from 'package.json'

import { jwtRouter } from '@/api/jwt'
import { sessionRouter } from '@/api/session'

const router = Router()

router.get('/', (_, res: Response) => {
  res.send({
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    status: '🚀'
  })
})

router.use('/auth', jwtRouter)
router.use('/auth', sessionRouter)

export default router
