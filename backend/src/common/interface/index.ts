import type { AllowedAmount, OutOfNetwork, OutOfNetworkPayment, Plan, Provider, ReportingEntity, TaxIdentifier } from '../../model/index.js'
import { Billing, BillingCodeStandard } from '../enum/index.js'

export interface IOutOfNetwork {
  name?: string
  billing_code_type?: BillingCodeStandard
  billing_code?: string
  billing_code_type_version?: string
  description?: string
  allowed_amounts?: AllowedAmount
}

export interface IAllowedAmount {
  tin?: TaxIdentifier
  service_code?: string
  billing_class: Billing
  payments: OutOfNetworkPayment
}

export interface IOutOfNetworkPayment {
  allowed_amount: number
  billing_code_modifier?: string
  providers: Provider
}

export interface IProvider {
  billed_charge: number
  npi?: string[]
}

export interface IOONRates {
  reporting_entity: ReportingEntity
  out_of_network: OutOfNetwork
  plan?: Plan
  last_updated_on: string
  version?: string
}

export interface IPlan {
  plan_name?: string
  plan_id_type?: 'EIN' | 'HIOS'
  plan_id?: string
  plan_market_type?: 'group' | 'individual'
}
