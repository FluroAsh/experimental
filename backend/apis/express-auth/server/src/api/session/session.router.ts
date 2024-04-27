import { Request, Response, Router } from 'express'

const router = Router()

const sessionAuth = (_req: Request, res: Response) => {
  res.send('You have been authenticated using a session')
}

router.post('/session', sessionAuth)

export default router
