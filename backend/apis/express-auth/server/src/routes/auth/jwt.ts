import { Request, Response, Router } from 'express'

const router = Router()

const jwtAuth = (_req: Request, res: Response) => {
  res.send('You have been authenticated using a JWT')
}

router.post('/', jwtAuth)

export default router
