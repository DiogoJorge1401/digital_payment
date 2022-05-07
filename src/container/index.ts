import { container } from 'tsyringe'
import { CartModel, CMRepository } from '../models/Cart'
import {
  TMRepository,
  TransactionModel,
} from '../models/Transaction/Transaction'
import { PagarMeProvider, PaymentGateway } from '../providers/'

container.registerInstance<CMRepository>('CartRepository', CartModel)

container.registerInstance<TMRepository>(
  'TransactionRepository',
  TransactionModel
)

container.registerSingleton<PaymentGateway>('PaymentGateway', PagarMeProvider)
