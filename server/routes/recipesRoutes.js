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
  uploadUrl,
} from '../controllers/recipesControllers.js'

const recipesRouter = express.Router()

recipesRouter.get('/', checkSession, findRecipes)

recipesRouter.delete('/img/:id', deleteImg)

recipesRouter.post('/', checkSession, recipeValidation, create)

recipesRouter.post('/upload', uploadUrl)

recipesRouter.get('/:id', checkSession, getOne)

recipesRouter.delete('/', checkSession, checkAuthor, remove)

recipesRouter.patch(
  '/edit',
  checkSession,
  checkAuthor,
  recipeValidation,
  update
)

recipesRouter.patch('/like', checkSession, likeDislike)

export default recipesRouter
