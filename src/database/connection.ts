import mongoose from 'mongoose'
import { databaseConfig } from '../config/database'
import { logger } from '../utils/logger'

class Database {
  constructor() {
    mongoose.connect(databaseConfig.databaseUri).then(()=>{
      logger.info("DB Connected")
    })
  }
}
export default new Database()
