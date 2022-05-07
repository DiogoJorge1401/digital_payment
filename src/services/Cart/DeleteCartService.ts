import { inject, injectable } from 'tsyringe'
import { AppError } from '../../errors/AppError'
import { CMRepository } from '../../models/Cart'

@injectable()
export class DeleteCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: CMRepository
  ) {}

  async execute(cartId:string) {
    const cart = await this.cartRepository.findById(cartId)

    if (!cart) throw new AppError('Cart not found.', 404)

    await cart.deleteOne()
  }
}
