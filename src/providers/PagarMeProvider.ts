import { cpf } from 'cpf-cnpj-validator'
import pagarme from 'pagarme'
import { TransactionRequest } from '../models/Transaction/Transaction'
import { PaymentGateway } from './PaymentGateway'

export class PagarMeProvider implements PaymentGateway {
  async execute(transaction: TransactionRequest, items?: any) {
    const billetParams = {
      payment_method: 'boleto',
      amount: transaction.total * 100,
      installments: 1,
    }

    const creditCardParams = {
      payment_method: 'credit_card',
      amount: transaction.total * 100,
      installments: transaction.installments,
      card_holder_name: transaction.creditCardHolderName,
      card_number: transaction.creditCardNumber.replace(/[^?0-9]/g, ''),
      card_expiration_date: transaction.creditCardExpiration.replace(
        /[^?0-9]/g,
        ''
      ),
      card_cvv: transaction.creditCardCvv,
      capture: true,
    }

    let paymentParams =
      transaction.paymentType === 'billet' ? billetParams : creditCardParams

    const customerParams = {
      customer: {
        external_id: transaction.customerEmail,
        name: transaction.customerName,
        email: transaction.customerEmail,
        type: cpf.isValid(transaction.customerDocument)
          ? 'individual'
          : 'corporation',
        country: 'br',
        phone_numbers: [transaction.customerMobile],
        documents: [
          {
            type: cpf.isValid(transaction.customerDocument) ? 'cpf' : 'cnpj',
            number: transaction.customerDocument.replace(/[^?0-9]/g, ''),
          },
        ],
      },
    }

    const billingParams = {
      billing: {
        name: 'Billing Address',
        address: {
          country: 'br',
          state: transaction.billingState,
          city: transaction.billingCity,
          neighborhood: transaction.billingNeighborhood,
          street: transaction.billingAddress,
          street_number: transaction.billingNumber,
          zpicode: transaction.billingZipCode.replace(/[^?0-9]/g, ''),
        },
      },
    }

    const itemsParams = {
      items: items
        ? items.map((item) => ({
            id: item?.id.toString(),
            title: item?.title,
            unit_price: item?.amount * 100,
            quantity: item?.quantity || 1,
            tangible: false,
          }))
        : [
            {
              id: '1',
              title: `t-${transaction.code}`,
              unit_price: +transaction.total * 100,
              quantity: 1,
              tangible: false,
            },
          ],
    }

    const metadataParams = {
      metadata: {
        transaction_code: transaction.code,
      },
    }

    const transactionParams = {
      async: false,
      // postback_url: '',
      ...paymentParams,
      ...customerParams,
      ...billingParams,
      ...itemsParams,
      ...metadataParams,
    }

    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    })

    const response = await client.transactions.create(transactionParams)

    return {
      transactionId: response.id,
      status: this.translateStatus(response.status),
      billet: {
        url: response.boleto_url,
        barCode: response.boleto_barcode,
      },
      card: {
        id: response.card?.id,
      },
      processorResponse: JSON.stringify(response),
    }
  }

  translateStatus(status: string): string {
    const statusMap = {
      processing: 'processing',
      waiting_payment: 'pending',
      authorized: 'pending',
      paid: 'approved',
      refused: 'refused',
      pending_refund: 'refunded',
      refunded: 'refunded',
      chargeback: 'chargeback',
    }
    return statusMap[status]
  }
}
