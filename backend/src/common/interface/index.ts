import type { Billing, BillingCodeStandard } from '../enum/index.js'

interface ReportingEntity {
  reporting_entity_name: string
  reporting_entity_type: string
}

interface Plan {
  plan_name?: string
  plan_id_type?: 'EIN' | 'HIOS'
  plan_id?: string
  plan_market_type?: 'group' | 'individual'
}

interface TaxIdentifier {
  type: 'ein' | 'npi'
  value: string
}

interface Provider {
  billed_charge: number
  npi?: string[]
}

interface OutOfNetworkPayment {
  allowed_amount: number
  billing_code_modifier?: string
  providers: Provider
}

interface AllowedAmount {
  tin?: TaxIdentifier
  service_code?: string
  billing_class: Billing
  payments: OutOfNetworkPayment
}

interface OutOfNetwork {
  name?: string
  billing_code_type?: BillingCodeStandard
  billing_code?: string
  billing_code_type_version?: string
  description?: string
  allowed_amounts?: AllowedAmount
}

export interface OONRates {
  reporting_entity: ReportingEntity
  plan?: Plan
  out_of_network: OutOfNetwork
  last_updated_on: string
  version?: string
}
