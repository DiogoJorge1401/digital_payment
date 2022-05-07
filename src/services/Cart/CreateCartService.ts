import { inject, injectable } from 'tsyringe'
import { CartRequest, CMRepository } from '../../models/Cart'

@injectable()
export class CreateCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: CMRepository
  ) {}

  async execute(cartRequest: CartRequest) {
    return await this.cartRepository.create(cartRequest)
  }
}
