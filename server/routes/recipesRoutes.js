import express from 'express'
import { checkAuthor, checkSession } from '../middleware/checkers.js'
import { recipeValidation } from '../validators/recipesValidator.js'
import {
  create,
  deleteImg,
  getAll,
  getFavourite,
  getMyRecipes,
  getOne,
  likeDislike,
  remove,
  update,
  upload,
  uploadUrl,
} from '../controllers/recipesControllers.js'

const recipesRouter = express.Router()

recipesRouter.get('/', getAll)
// app.get('/search', getBySearch)

recipesRouter.delete('/img/:path/:id', deleteImg)

recipesRouter.post('/', checkSession, recipeValidation, create)

recipesRouter.post(
  '/upload',
  upload.fields([{ name: 'img', maxCount: 1 }]),
  uploadUrl
)
recipesRouter.get('/favourites', checkSession, getFavourite)
recipesRouter.get('/myrecipes', checkSession, getMyRecipes)
recipesRouter.get('/:id', getOne)

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
