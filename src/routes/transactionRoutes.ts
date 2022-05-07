import { Router } from 'express'

const transactionRoutes = Router()

import {
  CreateTransactionController,
  DeleteTransactionController,
  GetAllTransactionsController,
  UpdateTransactionController,
} from '../controllers/Transaction'

const createTransactionController = new CreateTransactionController()
const deleteTransactionController = new DeleteTransactionController()
const getAllTransactionsController = new GetAllTransactionsController()
const updateTransactionController = new UpdateTransactionController()

transactionRoutes.post('/', createTransactionController.handle)
transactionRoutes.get('/', getAllTransactionsController.handle)
transactionRoutes.patch('/:id', updateTransactionController.handle)
transactionRoutes.delete('/:id', deleteTransactionController.handle)

export { transactionRoutes }
