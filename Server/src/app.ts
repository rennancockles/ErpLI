import express from 'express'
import cors from 'cors'
import 'express-async-errors';

import { router } from './routes'
import { authHandler, errorHandler } from './middlewares'

const app = express()

app.use(cors({
  exposedHeaders: 'X-AuthToken',
}))
app.use(express.json())
app.use(authHandler)
app.use(router)
app.use(errorHandler)

export { app }
