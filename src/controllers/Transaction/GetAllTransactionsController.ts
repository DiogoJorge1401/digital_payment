import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAllTransactionsService } from '../../services/Transaction'

export class GetAllTransactionsController {
  async handle(req: Request, res: Response) {
    const getAllTransactionsService = container.resolve(
      GetAllTransactionsService
    )

    const carts = await getAllTransactionsService.execute()

    return res.json({ carts })
  }
}
