import { inject, injectable } from 'tsyringe'
import { TMRepository } from '../../models/Transaction/Transaction'

@injectable()
export class GetAllTransactionsService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TMRepository
  ) {}

  async execute() {
    return await this.transactionRepository.find()
  }
}
