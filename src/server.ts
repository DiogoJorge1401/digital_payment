import 'dotenv/config'
import 'reflect-metadata'
import './database/connection'
import './container'

import { app } from './app'

app.start(+process.env.PORT)
