import express from 'express';


import loginRouter from '../routes/login.route.js'
import taskRouter from '../routes/entries.route.js'
import profileRouter from '../routes/profile.router.js'

const router = new express.Router()
router.use('/', taskRouter)
router.use('/', loginRouter)
router.use('/', profileRouter)
export default router