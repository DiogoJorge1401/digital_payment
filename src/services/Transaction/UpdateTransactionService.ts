import { inject, injectable } from 'tsyringe'
import { AppError } from '../../errors/AppError'
import { TMRepository } from '../../models/Transaction/Transaction'


@injectable()
export class UpdateTransactionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TMRepository
  ) {}

  async execute({ cartId, price }) {
    const cart = await this.transactionRepository.findById(cartId)

    if (!cart) throw new AppError('Cart not found.', 404)

    await cart.updateOne({ price })
  }
}
