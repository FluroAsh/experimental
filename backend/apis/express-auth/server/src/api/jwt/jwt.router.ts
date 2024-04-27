import { Router } from 'express'
import { jwtController } from './index'

const router = Router()

// Authenticate using a JWT
router.use((req, res, next) => {
  console.log('Middleware is running in the JWT Router')
  next()
})

router.post('/jwt')

export default router
