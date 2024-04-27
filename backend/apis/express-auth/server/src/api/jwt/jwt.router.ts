import { Request, Response, Router } from 'express'
// import { jwtAuth } from '@/controllers'

const router = Router()

// Authenticate using a JWT
router.use((req, res, next) => {
  console.log('Middleware is running in the JWT Router')
  next()
})

const jwtAuth = (_req: Request, res: Response) => {
  res.send('You have been authenticated using a JWT')
}

router.post('/jwt', jwtAuth)

export default router
