import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTransactionService } from '../../services/Transaction/'

export class UpdateTransactionController {
  async handle(req: Request, res: Response) {
    try {
      const updateTransactionService = container.resolve(
        UpdateTransactionService
      )

      const { price } = req.body
      const { id } = req.params

      await updateTransactionService.execute({ price, cartId: id })

      return res.send()
    } catch (err) {
      return res.status(err?.status || 400).json({ error: err.message })
    }
  }
}
