import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCartService } from '../../services/Cart'

export class UpdateCartController {
  async handle(req: Request, res: Response) {
    try {
      const updateCartService = container.resolve(UpdateCartService)

      const { price } = req.body
      const { id } = req.params

      await updateCartService.execute({ price, cartId: id })

      return res.send()
    } catch (err) {
      return res.status(err?.status || 400).json({ error: err.message })
    }
  }
}
