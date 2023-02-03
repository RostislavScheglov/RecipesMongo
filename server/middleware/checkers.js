import jwt from 'jsonwebtoken'
import recipeModel from '../models/Recipe.js'

export function checkSession(req, res, next) {
  const token = req.headers.session
  if (token) {
    try {
      const decoded = jwt.verify(token, 'a1b2c')
      req.userId = decoded._id
      next()
    } catch (err) {
      return res.status(403).json({ message: 'Bad session' })
    }
  } else {
    return res.status(403).json({ message: 'No token' })
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
