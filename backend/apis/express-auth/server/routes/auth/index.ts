import { Router } from 'express'
import jwtRouter from './jwt'
import sessionRouter from './session'

const router = Router()

router.use('/jwt', jwtRouter)
router.use('/session', sessionRouter)

export default router
