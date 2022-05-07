import * as yup from 'yup'
import { parsePhoneNumber } from 'libphonenumber-js'
import { cnpj, cpf } from 'cpf-cnpj-validator'

export const requestTransactionValidation = yup.object({
  cartCode: yup.string().required(),
  paymentType: yup.mixed().oneOf(['billet', 'credit_card']),
  installments: yup
    .number()
    .min(1)
    .when('paymentType', (paymentType, schema) =>
      paymentType === 'credit_card' ? schema.max(12) : schema.max(1)
    ),

  customerName: yup.string().required().min(3),
  customerEmail: yup.string().required().email(),
  customerMobile: yup
    .string()
    .required()
    .test('is-valid-mobile', '${path} is not a mobile number', (value) =>
      parsePhoneNumber(value, 'BR').isValid()
    ),
  customerDocument: yup
    .string()
    .required()
    .test(
      'is-valid-document',
      '${path} is not a valid CPF / CNPJ',
      (value) => cpf.isValid(value) || cnpj.isValid(value)
    ),

  billingAddress: yup.string().required(),
  billingNumber: yup.number().required(),
  billingNeighborhood: yup.string().required(),
  billingCity: yup.string().required(),
  billingState: yup.string().required(),
  billingZipCode: yup.string().required(),

  creditCardNumber: yup
    .string()
    .when('paymentType', (paymentType, schema) =>
      paymentType === 'credit_card' ? schema.required() : schema
    ),
  creditCardExpiration: yup
    .string()
    .when('paymentType', (paymentType, schema) =>
      paymentType === 'credit_card' ? schema.required() : schema
    ),
  creditCardHolderName: yup
    .string()
    .when('paymentType', (paymentType, schema) =>
      paymentType === 'credit_card' ? schema.required() : schema
    ),
  creditCardCvv: yup
    .number()
    .when('paymentType', (paymentType, schema) =>
      paymentType === 'credit_card' ? schema.required() : schema
    ),
})
