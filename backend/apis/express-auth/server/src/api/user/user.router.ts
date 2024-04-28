import { Router } from 'express'
import { POST, GET, authenticateToken } from './user.controller'

const router = Router()

/* ----- Private routes ----- */
router.get('/details', authenticateToken, GET)

/* ----- Public routes ----- */
router.post('/register', POST.register)
router.post('/login', POST.login)

export default router
