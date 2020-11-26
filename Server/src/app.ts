import express from 'express'
import cors from 'cors'
import 'express-async-errors';

import './database/connection'
import { router } from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandler)

export { app }
