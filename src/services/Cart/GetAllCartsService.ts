import { inject, injectable } from 'tsyringe'
import { CMRepository } from '../../models/Cart'

@injectable()
export class GetAllCartsService {
  constructor(
    @inject('CartRepository')
    private cartRepository: CMRepository
  ) {}

  async execute() {
    return await this.cartRepository.find()
  }
}
