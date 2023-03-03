import express from 'express'
import {
  forgotPasswordValidation,
  loginValidation,
  registrValidation,
} from '../validators/authValidator.js'
import {
  forgotPassword,
  getMe,
  login,
  registration,
} from '../controllers/userControllers.js'
import { checkSession } from '../middleware/checkers.js'

const userRouter = express.Router()

userRouter.post('/forgotPassword', forgotPasswordValidation, forgotPassword)
userRouter.post('/registration', registrValidation, registration)
userRouter.post('/login', loginValidation, login)
userRouter.post('/me', checkSession, getMe)

export default userRouter
