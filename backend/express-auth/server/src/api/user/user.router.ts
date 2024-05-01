import { Router } from 'express'
import { POST, GET, authenticateToken, verifyUserMatch } from './user.controller'

const router = Router()

/* ----- Public routes ----- */
router.get('/details', GET.getAllUsers)
router.post('/register', POST.register)
router.post('/login', POST.login)

/* ----- Private routes ----- */
router.use(authenticateToken)
router.get('/:id', verifyUserMatch, GET.getUser)

export default router
