import type { Billing, BillingCodeStandard } from '../common/enum/index.js'
import type { IAllowedAmount, IOONRates, IOutOfNetwork, IOutOfNetworkPayment, IProvider } from '../common/interface/index.js'

export class ReportingEntity {
  reporting_entity_name: string
  reporting_entity_type: string

  constructor({ reporting_entity_name, reporting_entity_type }: any) {
    this.reporting_entity_name = reporting_entity_name
    this.reporting_entity_type = reporting_entity_type
  }
}

export class Plan {
  plan_name?: string
  plan_id_type?: 'EIN' | 'HIOS'
  plan_id?: string
  plan_market_type?: 'group' | 'individual'

  constructor({ plan_name, plan_id_type, plan_id, plan_market_type }: Plan) {
    this.plan_name = plan_name
    this.plan_id_type = plan_id_type
    this.plan_id = plan_id
    this.plan_market_type = plan_market_type
  }
}

export class TaxIdentifier {
  type: 'ein' | 'npi'
  value: string

  constructor(type: 'ein' | 'npi', value: string) {
    this.type = type
    this.value = value
  }
}

export class Provider {
  billed_charge: number
  npi?: string[]

  constructor({ billed_charge, npi }: IProvider) {
    this.billed_charge = billed_charge
    this.npi = npi
  }
}

export class OutOfNetworkPayment {
  allowed_amount: number
  billing_code_modifier?: string
  providers: Provider

  constructor({ allowed_amount, billing_code_modifier, providers }: IOutOfNetworkPayment) {
    this.allowed_amount = allowed_amount
    this.billing_code_modifier = billing_code_modifier
    this.providers = providers
  }
}

export class AllowedAmount {
  tin?: TaxIdentifier
  service_code?: string
  billing_class: Billing
  payments: OutOfNetworkPayment

  constructor({ billing_class, tin, service_code, payments }: IAllowedAmount) {
    this.billing_class = billing_class
    this.tin = tin
    this.service_code = service_code
    this.payments = payments
  }
}

export class OutOfNetwork {
  name?: string
  billing_code_type?: BillingCodeStandard
  billing_code?: string
  billing_code_type_version?: string
  description?: string
  allowed_amounts?: AllowedAmount

  constructor({ name, billing_code_type, billing_code, billing_code_type_version, description, allowed_amounts }: IOutOfNetwork) {
    this.name = name
    this.billing_code_type = billing_code_type
    this.billing_code = billing_code
    this.billing_code_type_version = billing_code_type_version
    this.description = description
    this.allowed_amounts = allowed_amounts
  }
}

export class OONRates {
  reporting_entity: ReportingEntity
  out_of_network: OutOfNetwork
  plan?: Plan
  last_updated_on: string
  version?: string

  constructor({ reporting_entity, out_of_network, last_updated_on, plan, version }: IOONRates) {
    this.reporting_entity = reporting_entity
    this.out_of_network = out_of_network
    this.plan = plan
    this.last_updated_on = last_updated_on
    this.version = version
  }
}
