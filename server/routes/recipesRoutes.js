import express from 'express'
import { checkAuthor, checkSession } from '../middleware/checkers.js'
import { recipeValidation } from '../validators/recipesValidator.js'
import {
  create,
  deleteImg,
  findRecipes,
  getOne,
  likeDislike,
  remove,
  update,
  upload,
  uploadUrl,
} from '../controllers/recipesControllers.js'

const recipesRouter = express.Router()

// app.get('/search', getBySearch)
recipesRouter.get('/:filter([a-z]+)/:id?', checkSession, findRecipes)

recipesRouter.delete('/img/:path/:imgId', deleteImg)
recipesRouter.post('/', checkSession, recipeValidation, create)

recipesRouter.post(
  '/upload',
  upload.fields([{ name: 'img', maxCount: 1 }]),
  uploadUrl
)

recipesRouter.get('/:id', getOne)
// recipesRouter.get('/author/:id', getOne)

recipesRouter.delete('/:id/:userId', checkSession, checkAuthor, remove)

recipesRouter.patch(
  '/edit/:id/:userId',
  checkSession,
  checkAuthor,
  recipeValidation,
  update
)

recipesRouter.patch('/likeDislike/:id', checkSession, likeDislike)

export default recipesRouter
