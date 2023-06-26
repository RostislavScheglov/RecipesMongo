import userSchema from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import userModel from '../models/User.js'

import fs from 'fs'
import { domain, transporter } from '../config/config.js'

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.errors)
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
      // token: '',
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
export const updateUserInfo = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.errors)
    }
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.userId },
      {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        // userPassword: req.body.userPassword,
      },
      { new: true }
    )
    const { userPassword, ...userData } = updatedUser._doc
    res.send(userData)
  } catch (err) {
    res.status(400).json([
      {
        err: err,
        msg: 'Cant update user',
      },
    ])
  }
}

export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.errors)
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
      return res.status(400).json(errors.errors)
    }
    const user = await userModel.findOne({ userEmail: req.body.userEmail })
    if (!user) {
      return res.status(404).json([
        {
          msg: 'User not found',
        },
      ])
    }
    const payload = {
      email: user.userEmail,
      id: user._id,
    }
    const secret = user.userPassword + 'a1b2c'
    const resetToken = jwt.sign(payload, secret, { expiresIn: '10m' })
    const resetLink = `${domain}auth/resetPassword/${user._id}/${resetToken}`

    const mail_configs = {
      from: 'rostislav7333@gmail.com',
      to: req.body.userEmail,
      subject: 'No-reply pasword forget',
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Pasword recovery procedure</title>
  
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Recipes.</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Use the following link to complete your Password Recovery Procedure. Link is valid for 10 minutes</p>
    <h2 style="display:flex; width:50%; margin: 0 auto;padding: 0 10px;color: #fff;border-radius: 4px;">${resetLink}</h2>
    <p style="font-size:0.9em;">Regards,<br />RS</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
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
      .json([{ msg: `reset password link was sent to ${req.body.userEmail}` }])
  } catch (err) {
    console.log(err)
    res.status(500).json([
      {
        msg: 'Unable to reset password',
      },
    ])
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.errors)
    }

    const user = await userModel.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json([
        {
          msg: 'User not found',
        },
      ])
    }

    const secret = user.userPassword + 'a1b2c'
    const payload = jwt.verify(token, secret)

    const passwordCrypt = await bcrypt.hash(
      req.body.userPassword,
      await bcrypt.genSalt(10)
    )

    await userModel.findOneAndUpdate(
      { _id: payload.id, userEmail: payload.email },
      {
        userPassword: passwordCrypt,
      }
    )

    res.status(200).json([{ msg: `password was reset` }])
  } catch (err) {
    console.log(err)
    res.status(500).json([
      {
        msg: `Unable to reset password:${err}`,
      },
    ])
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

export const uploadUrl = async (req, res) => {
  const imgUrl = req.files.img[0].path.replaceAll('\\', '/')
  userModel.findOneAndUpdate(
    { _id: req.body.id },
    {
      userImage: imgUrl,
    },
    (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(400).json([
          {
            msg: 'Cant update imgUrl',
          },
        ])
      }
      if (!doc) {
        return res.status(404).json([
          {
            msg: 'Cant find user',
          },
        ])
      }
    }
  )
  res.send({
    imgUrl: imgUrl,
    msg: 'Img Uploaded successfull',
  })
}
export const deleteImg = async (req, res) => {
  const param = req.params
  try {
    const imgUrl = param.mainDirectory + '/' + param.path + '/' + param.imgId
    userModel.findOneAndUpdate(
      { userImage: imgUrl },
      {
        userImage: '',
      },
      (err, doc) => {
        if (err) {
          return res.status(400).json({
            msg: 'Cant delete img url',
          })
        }
        if (!doc) {
          return res.status(404).json({
            msg: 'Cant find recipe',
          })
        }
      }
    )
    fs.unlink(imgUrl, (err) => {
      console.log(err)
      if (err) {
        return res.status(400).json({
          msg: 'Cant delete img from fs',
        })
      }
    })
    res.status(200).json({
      url: 'Img deleted ',
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      msg: 'Problem while deleting img',
    })
  }
}
