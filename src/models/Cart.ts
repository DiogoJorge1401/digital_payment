import mongoose from 'mongoose'

export interface CartRequest {
  code: string
  price: number
}

interface CartDocument
  extends mongoose.Document,
    mongoose.SchemaTimestampsConfig,
    CartRequest {}

const schema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)
export const CartModel = mongoose.model<CartDocument>('Cart', schema)
export type CMRepository = mongoose.Model<CartDocument>
