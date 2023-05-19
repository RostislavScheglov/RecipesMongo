import express from 'express'
import { config } from './config/config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import recipesRouter from './routes/recipesRoutes.js'
import userRouter from './routes/usersRoutes.js'

const app = express()
const port = config.serverPort
const dbUrl = config.dbURL

app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'))
app.use('/recipes', recipesRouter)
app.use('/auth', userRouter)

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
