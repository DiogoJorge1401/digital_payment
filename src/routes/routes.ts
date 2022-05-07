import { Router } from 'express'
import { cartRoutes } from './cartRoutes'
import { transactionRoutes } from './transactionRoutes'

const routes = Router()

routes.use('/carts', cartRoutes)
routes.use('/transactions', transactionRoutes)

export { routes }
