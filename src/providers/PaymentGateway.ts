import { TransactionRequest } from '../models/Transaction/Transaction'

export interface PaymentGateway {
  execute(
    transaction: TransactionRequest,
    items?: []
  ): Promise<{
    transactionId: string
    status: string
    processorResponse: string
  }>

  translateStatus(status: string): string
}
