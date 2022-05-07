import cors from 'cors'
import e, { Express } from 'express'
import { routes } from './routes/routes'
import { logger } from './utils/logger'

class App {
  app: Express

  constructor() {
    this.app = e()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(e.json())
    this.app.use(cors())
  }

  routes() {
    this.app.use(routes)
  }

  start(port: number) {
    this.app.listen(port, () =>
      logger.info(`Server running at http://localhost:${port}`)
    )
  }
}
export const app = new App()
