import jwt from 'jsonwebtoken'
import recipeModel from '../models/Recipe.js'
import userModel from '../models/User.js'

export function checkSession(req, res, next) {
  const recipesFilter = req.params.filter
  if (recipesFilter === 'all' || recipesFilter === 'author') {
    return next()
  }
  try {
    const token = req.headers.session
    if (token) {
      const decoded = jwt.verify(token, 'a1b2c')
      req.userId = decoded._id
      next()
    } else {
      return res.status(403).json([{ msg: 'No token' }])
    }
  } catch (err) {
    return res.status(403).json([{ msg: 'Bad session' }])
  }
}

export async function checkAuthor(req, res, next) {
  try {
    const checkedAuthor = await recipeModel.findOne({
      _id: req.params.id,
      author: req.params.userId,
    })
    if (checkedAuthor === null || checkedAuthor === undefined) {
      return res.status(404).json([
        {
          msg: 'Not permitted action',
        },
      ])
    }
    next()
  } catch (err) {
    return res.json({ msg: err })
  }
}

export async function uniqueEmail(req, res, next) {
  const myEmailExist = await userModel.findOne({
    _id: req.userId,
    userEmail: req.body.userEmail,
  })
  if (myEmailExist) {
    return next()
  }
  const userEmailExist = await userModel.findOne({
    userEmail: req.body.userEmail,
  })
  if (userEmailExist) {
    return res.status(500).json([
      {
        msg: 'User with this email already exists',
      },
    ])
  }
  next()
}

export async function uniqueName(req, res, next) {
  const myNameExist = await userModel.findOne({
    _id: req.userId,
    userName: req.body.userName,
  })
  if (myNameExist) {
    return next()
  }

  const userNameExist = await userModel.findOne({
    userName: req.body.userName,
  })
  if (userNameExist) {
    return res.status(500).json([
      {
        msg: 'User with this NickName already exists',
      },
    ])
  }
  next()
}
// export async function uniquePersonalInfo(req, res, next) {
//   uniqueName(req, res, next)
//   uniqueEmail(req, res, next)
//   next()
// }
