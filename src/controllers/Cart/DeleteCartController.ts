import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCartService } from '../../services/Cart'

export class DeleteCartController {
  async handle(req: Request, res: Response) {
    try {
      const deleteCartService = container.resolve(DeleteCartService)

      const { id } = req.params

      await deleteCartService.execute(id)

      return res.send()
    } catch (err) {
      return res.status(err?.status || 400).json({ error: err.message })
    }
  }
}
