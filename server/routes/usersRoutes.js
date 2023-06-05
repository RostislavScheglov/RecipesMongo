import express from 'express'
import {
  forgotPasswordValidation,
  loginValidation,
  registrValidation,
} from '../validators/authValidator.js'
import {
  deleteImg,
  forgotPassword,
  getMe,
  login,
  registration,
  updateUserInfo,
  uploadUrl,
} from '../controllers/userControllers.js'
import {
  checkSession,
  uniqueEmail,
  uniqueName,
  // existInfo,
  // uniquePersonalInfo,
} from '../middleware/checkers.js'
import { upload } from '../config/config.js'

const userRouter = express.Router()

userRouter.post('/forgotPassword', forgotPasswordValidation, forgotPassword)
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
