import mongoose from 'mongoose'

type Status =
  | 'started'
  | 'processing'
  | 'pending'
  | 'approved'
  | 'refused'
  | 'refunded'
  | 'chargeback'
  | 'error'

type PaymentType = 'billet' | 'credit_card'

export interface TransactionRequest {
  cartCode: string
  code: number
  status: Status
  paymentType: PaymentType
  installments: number
  total?: number
  processorResponse?: string
  customerEmail: string
  customerName: string
  customerMobile: string
  customerDocument: string
  billingAddress: string
  billingNumber: string
  billingNeighborhood: string
  billingCity: string
  billingState: string
  billingZipCode: string
  creditCardNumber?: string
  creditCardExpiration?: string
  creditCardHolderName?: string
  creditCardCvv?: number
}

interface TransactionDocument
  extends mongoose.Document,
    mongoose.SchemaTimestampsConfig,
    TransactionRequest {}

const schema = new mongoose.Schema(
  {
    cartCode: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: [
        'started',
        'processing',
        'pending',
        'approved',
        'refused',
        'refunded',
        'chargeback',
        'error',
      ],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['billet', 'credit_card'],
    },
    installments: {
      type: Number,
    },
    total: {
      type: Number,
    },
    processorResponse: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerMobile: {
      type: String,
    },
    customerDocument: {
      type: String,
    },
    billingAddress: {
      type: String,
    },
    billingNumber: {
      type: String,
    },
    billingNeighborhood: {
      type: String,
    },
    billingCity: {
      type: String,
    },
    billingState: {
      type: String,
    },
    billingZipCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
export const TransactionModel = mongoose.model<TransactionDocument>(
  'Transaction',
  schema
)
export type TMRepository = mongoose.Model<TransactionDocument>
