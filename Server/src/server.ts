import 'dotenv/config'
import './database/connection'
import { app } from "./app"

app.listen(3333)