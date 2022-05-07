import { inject, injectable } from 'tsyringe'
import { AppError } from '../../errors/AppError'
import { CMRepository } from '../../models/Cart'

interface UpdateCartServiceRequest {
  cartId: string
  price: number
}

@injectable()
export class UpdateCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: CMRepository
  ) {}

  async execute({ cartId, price }: UpdateCartServiceRequest) {
    const cart = await this.cartRepository.findById(cartId)

    if (!cart) throw new AppError('Cart not found.', 404)

    await cart.updateOne({ price })
  }
}
