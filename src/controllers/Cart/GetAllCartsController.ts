import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAllCartsService } from '../../services/Cart'

export class GetAllCartsController {
  async handle(req: Request, res: Response) {
    const getAllCartsService = container.resolve(GetAllCartsService)

    const carts = await getAllCartsService.execute()
    
    return res.json({ carts })
  }
}
