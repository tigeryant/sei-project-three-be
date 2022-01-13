import express from 'express'
import cors from 'cors'
import router from './config/router.js'
import logger from './lib/logger.js'
import errorHandler from './lib/errorHandler.js'
import { connectDb } from './db/helpers.js'
import { port } from './config/environment.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)



// async function startSever() {
//   try {
//     await connectDb()
//     console.log('🤖 Database connected')
//     app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`))
//   } catch (err) {
//     console.log('🤖 Oh no something went wrong')
//     console.log(err)
//   }
// }

// startSever()

async function startApp() {
  try {
    await connectDb()
    console.log('Database has connected!')

    app.listen(port, () => console.log('Express is now running'))
  } catch (e) {
    console.log('Something went wrong starting app..')
    console.log(e)
  }
}

startApp()