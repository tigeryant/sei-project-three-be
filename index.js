import express from 'express'
import router from './config/router.js'
import logger from './lib/logger.js'
import errorHandler from './lib/errorHandler.js'
import { connectDb } from './db/helpers.js'
import { port } from './config/environment.js'

const app = express()
app.use(express.json())
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)



async function startSever() {
  try {
    await connectDb()
    console.log('🤖 Database connected')
    app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`))
  } catch (err) {
    console.log('🤖 Oh no something went wrong')
    console.log(err)
  }
}

startSever()