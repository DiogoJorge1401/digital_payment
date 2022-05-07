import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTransactionService } from '../../services/Transaction/'

export class CreateTransactionController {
  async handle(req: Request, res: Response) {
    const createTransactionService = container.resolve(CreateTransactionService)
    try {
      const result = await createTransactionService.execute(req.body)

      return res.status(201).json({ transaction: result })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}
