import jwt from 'jsonwebtoken'
import recipeModel from '../models/Recipe.js'

export function checkSession(req, res, next) {
  const recipesFilter = req.params.filter
  if (recipesFilter === 'all') {
    return next()
  }
  try {
    const token = req.headers.session
    if (token) {
      const decoded = jwt.verify(token, 'a1b2c')
      req.userId = decoded._id
      next()
    } else {
      return res.status(403).json({ message: 'No token' })
    }
  } catch (err) {
    return res.status(403).json({ message: 'Bad session' })
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
