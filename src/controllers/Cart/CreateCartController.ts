import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCartService } from '../../services/Cart'

export class CreateCartController {
  async handle(req: Request, res: Response) {
    const createCartService = container.resolve(CreateCartService)

    try {
      const result = await createCartService.execute(req.body)

      return res.status(201).json({ cart: result })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}
