import { Router } from 'express'
import * as uc from './user.controller'

const router = Router()

/* ---- Private routes ---- */
router.get('/details', uc.authenticateToken, uc.GET)

/* ---- Public routes ---- */
router.post('/register', uc.POST.register)
router.post('/login', uc.authenticateToken, uc.POST.login)

export default router
