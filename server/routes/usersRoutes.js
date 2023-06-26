import express from 'express'
import {
  forgotPasswordValidation,
  loginValidation,
  registrValidation,
  resetPasswordValidation,
} from '../validators/authValidator.js'
import {
  deleteImg,
  forgotPassword,
  getMe,
  login,
  registration,
  resetPassword,
  updateUserInfo,
  uploadUrl,
} from '../controllers/userControllers.js'
import {
  checkSession,
  uniqueEmail,
  uniqueName,
} from '../middleware/checkers.js'
import { upload } from '../config/config.js'

const userRouter = express.Router()

userRouter.post('/forgotPassword', forgotPasswordValidation, forgotPassword)

userRouter.post(
  '/resetPassword/:userId/:token',
  resetPasswordValidation,
  resetPassword
)

userRouter.post(
  '/uploads/:path',
  upload.fields([{ name: 'img', maxCount: 1 }]),
  uploadUrl
)
userRouter.patch(
  '/me/edit',
  checkSession,
  uniqueName,
  uniqueEmail,
  // registrValidation,
  // uniquePersonalInfo,
  updateUserInfo
)
userRouter.post('/registration', registrValidation, registration)
userRouter.delete('/img/:mainDirectory/:path/:imgId', deleteImg)
userRouter.post('/login', loginValidation, login)
userRouter.get('/me', checkSession, getMe)

export default userRouter
