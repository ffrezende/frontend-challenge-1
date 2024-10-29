import { z } from 'zod'

const csvRowSchema = z.object({
  'Claim ID': z.string(),
  'Subscriber ID': z.string(),
  'Member Sequence': z.number().int(),
  'Claim Status': z.string(),
  Billed: z.number(),
  Allowed: z.number(),
  Paid: z.number(),
  'Payment Status Date': z.string().datetime(),
  'Service Date': z.string().datetime(),
  'Received Date': z.string().datetime(),
  'Entry Date': z.string().datetime(),
  'Processed Date': z.string().datetime(),
  'Paid Date': z.string().datetime(),
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

export const csvSchema = z.array(csvRowSchema)
