import { Router } from 'express'
import {
  CreateCartController,
  DeleteCartController,
  GetAllCartsController,
  UpdateCartController,
} from '../controllers/Cart'

const cartRoutes = Router()

const createCartController = new CreateCartController()
const getAllCartsController = new GetAllCartsController()
const updateCartController = new UpdateCartController()
const deleteCartController = new DeleteCartController()

cartRoutes.post('/', createCartController.handle)
cartRoutes.get('/', getAllCartsController.handle)
cartRoutes.patch('/:id', updateCartController.handle)
cartRoutes.delete('/:id', deleteCartController.handle)

export { cartRoutes }
