import userSchema from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import userModel from '../models/User.js'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rostislav7333@gmail.com',
    pass: 'ziabooupfzvhruov',
  },
})

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    const userExists = await userModel.findOne({
      userEmail: req.body.userEmail,
    })
    if (userExists) {
      return res.status(500).json([
        {
          msg: 'User with this email already exists',
        },
      ])
    }
    const passwordCrypt = await bcrypt.hash(
      req.body.userPassword,
      await bcrypt.genSalt(10)
    )
    const user = new userSchema({
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      userPassword: passwordCrypt,
    })
    await user.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'a1b2c',
      {
        expiresIn: '20d',
      }
    )
    const { userPassword, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json([
      {
        msg: 'Registration faild',
      },
    ])
  }
}

export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    const user = await userModel.findOne({ userEmail: req.body.userEmail })
    if (!user) {
      return res.status(404).json([
        {
          msg: 'User not found',
        },
      ])
    }
    const isValidPass = await bcrypt.compare(
      req.body.userPassword,
      user._doc.userPassword
    )
    if (!isValidPass) {
      return res.status(403).json([
        {
          msg: 'Invalid email or password',
        },
      ])
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'a1b2c',
      {
        expiresIn: '20d',
      }
    )

    const { userPassword, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Unable to log in',
    })
  }
}
export const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    const user = await userModel.findOne({ userEmail: req.body.userEmail })
    if (!user) {
      return res.status(404).json([
        {
          msg: 'User not found',
        },
      ])
    }
    const mail_configs = {
      from: 'rostislav7333@gmail.com',
      to: req.body.userEmail,
      subject: 'No-reply pasword reset',
      text: 'You can reset your password by',
    }
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        return res.status(500).json([
          {
            msg: 'Unable to send reset password link',
          },
        ])
      }
    })
    res
      .status(200)
      .json({ msg: `reset password link was sent to ${req.body.userEmail}` })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Unable reset password',
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId)
    if (!user) {
      return res.status(404).json([
        {
          msg: 'User not found',
        },
      ])
    }
    const { userPassword, ...userData } = user._doc

    res.json({
      ...userData,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json([
      {
        msg: 'Cant authorize user',
      },
    ])
  }
}
