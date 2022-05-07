import { randomUUID } from 'crypto'
import { parsePhoneNumber } from 'libphonenumber-js'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../errors/AppError'
import { CMRepository } from '../../models/Cart'
import { requestTransactionValidation } from '../../models/Transaction/schemaValidation'
import {
  TMRepository,
  TransactionRequest,
} from '../../models/Transaction/Transaction'
import { PaymentGateway } from '../../providers'

@injectable()
export class CreateTransactionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TMRepository,
    @inject('CartRepository')
    private cartRepository: CMRepository,
    @inject('PaymentGateway')
    private paymentGateway: PaymentGateway
  ) {}

  async execute(transactionRequest: TransactionRequest) {
    await requestTransactionValidation.validate(transactionRequest)

    const cart = await this.cartRepository.findOne({
      code: transactionRequest.cartCode,
    })

    if (!cart) throw new AppError('Cart not found.')

    const transaction = await this.transactionRepository.create({
      ...transactionRequest,
      code: randomUUID(),
      total: cart.price,
      status: 'started',
    })

    const response = await this.paymentGateway.execute({
      ...transactionRequest,
      ...transaction,
      total: transaction.total,
      code: transaction.code,
      customerMobile: parsePhoneNumber(
        transactionRequest.customerMobile,
        'BR'
      ).format('E.164'),
    })

    await transaction.updateOne({
      transationId: response.transactionId,
      status: response.status,
      processorResponse: response.processorResponse,
    })

    return response
  }
}
