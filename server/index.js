import express from 'express'
import { serverConfig } from './config/config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import recipesRouter from './routes/recipesRoutes.js'
import userRouter from './routes/usersRoutes.js'
import fs from 'fs'
import https from 'https'

const app = express()
const dbUrl = serverConfig.dbURL
const key = fs.readFileSync('private.key')
const cert = fs.readFileSync('certificate.crt')
const cred = {
  key,
  cert,
}

app.use(cors())
app.use(express.json({ limit: '5mb', type: 'application/json' }))
app.use('/recipes', recipesRouter)
app.use('/user', userRouter)

const start = async () => {
  // const httpsServ = https.createServer(cred, app)
  // httpsServ.listen(8443, (err) => {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log('Server running on port 8443')
  // })
  app.listen(4000)
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('Db connected')
    })
    .catch((err) => {
      console.log('Db error: ' + err)
    })
}

start()
