import { inject, injectable } from 'tsyringe'
import { AppError } from '../../errors/AppError'
import { TMRepository } from '../../models/Transaction/Transaction'

@injectable()
export class DeleteTransactionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TMRepository
  ) {}

  async execute(transactionId) {
    const transaction = await this.transactionRepository.findById(transactionId)

    if (!transaction) throw new AppError('Transaction not found.', 404)

    await transaction.deleteOne()
  }
}
