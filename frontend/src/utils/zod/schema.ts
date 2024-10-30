import { z } from 'zod'
import { CSVHeaders } from '~/common/constants'

const numberIdStringSchema = z.string().transform((str) => {
  const parsedNumber = parseInt(str)
  if (isNaN(parsedNumber)) {
    throw new Error('Invalid Id number')
  }
  return parsedNumber
})

const floatStringSchema = z.string().transform((str) => {
  const parsedNumber = parseFloat(str)
  if (isNaN(parsedNumber)) {
    throw new Error('Invalid number')
  }
  return parsedNumber
})

const dateStringSchema = z.string().refine(
  (dateStr) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    return dateRegex.test(dateStr) && !isNaN(Date.parse(dateStr))
  },
  { message: 'Invalid date format' },
)

const claimStatusSchema = z.enum(['Partial Deny', 'Payable', 'Denied'])

export const csvRowSchema = z.object({
  'Claim ID': numberIdStringSchema,
  'Subscriber ID': z.string(),
  'Member Sequence': numberIdStringSchema,
  'Claim Status': claimStatusSchema,
  Billed: floatStringSchema,
  Allowed: floatStringSchema,
  Paid: floatStringSchema,
  'Payment Status Date': dateStringSchema,
  'Service Date': dateStringSchema,
  'Received Date': dateStringSchema,
  'Entry Date': dateStringSchema,
  'Processed Date': dateStringSchema,
  'Paid Date': dateStringSchema,
  'Payment Status': z.string(),
  'Group Name': z.string(),
  'Group ID': z.string(),
  'Division Name': z.string(),
  'Division ID': z.string(),
  Plan: z.string(),
  'Plan ID': z.string(),
  'Place of Service': z.string(),
  'Claim Type': z.string(),
  'Procedure Code': z.string(),
  'Member Gender': z.string(),
  'Provider ID': z.string(),
  'Provider Name': z.string(),
})

export const csvHeaderSchema = (headers) => {
  const error = []
  let success = true

  CSVHeaders.forEach((header) => {
    const isValid = headers.includes(header)
    if (!isValid) {
      error.push({ error: `Header ${header} is not present` })
      success = false
    }
  })

  return { success, error }
}
