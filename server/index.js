import express from 'express'
import bodyParser from 'body-parser'
import { config } from './config/config.js'
import mongoose from 'mongoose'
import {
  registrValidation,
  loginValidation,
  recipeValidation,
} from './validators/authValidator.js'
import { registration, login, getMe } from './routes/userActions.js'
import {
  create,
  getAll,
  getOne,
  remove,
  update,
  getFavourite,
  getMyRecipes,
  getBySearch,
  deleteImg,
} from './routes/recipesActions.js'
import checkSession from './middleware/checkSession.js'
import cors from 'cors'
import multer from 'multer'

const app = express()
const port = config.serverPort
const dbUrl = config.dbURL

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Math.floor(Math.random() * 999) +
        Date.now() +
        file.mimetype.replace('/', '.')
    )
  },
})

export const upload = multer({ storage })

app.use(express.json())
app.use(cors())

app.delete('/:path/:id', deleteImg)
app.use('/uploads', express.static('uploads'))
app.post('/auth/registration', registrValidation, registration)
app.post('/auth/login', loginValidation, login)
app.post('/auth/me', checkSession, getMe)
app.get('/recipes', getAll)
app.get('/search', getBySearch)

app.post(
  '/recipes',
  checkSession,
  upload.fields([{ name: 'img', maxCount: 1 }]),
  recipeValidation,
  create
)

app.get('/recipes/favourites', checkSession, getFavourite)
app.get('/recipes/myrecipes', checkSession, getMyRecipes)
app.get('/recipes/:id', getOne)
app.delete('/recipes/:id', checkSession, remove)
app.patch('/recipes/:id', checkSession, update)

const start = async () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('Db connected')
    })
    .catch((err) => {
      console.log('Db error: ' + err)
    })
  app.listen(port, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('Server running on port ' + port)
  })
}

start()
