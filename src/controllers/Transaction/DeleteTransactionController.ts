import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteTransactionService } from '../../services/Transaction'

export class DeleteTransactionController {
  async handle(req: Request, res: Response) {
    try {
      const deleteTransactionService = container.resolve(
        DeleteTransactionService
      )

      const { id } = req.params

      await deleteTransactionService.execute(id)

      return res.send()
    } catch (err) {
      return res.status(err?.status || 400).json({ error: err.message })
    }
  }
}
