import Papa from 'papaparse'
import fs from 'fs'

import { UPLOAD_FOLDER } from '../common/constants/index.js'
import type { IOONRates } from '../common/interface/index.js'
import { AllowedAmount, OONRates, OutOfNetwork, OutOfNetworkPayment, Plan, Provider, ReportingEntity } from '../model/index.js'

export const saveFile = async (filePath: string, data: string) => {
  if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true })
  }

  fs.writeFile(`${UPLOAD_FOLDER}/${filePath.split('.')[0].replace(/\s/g, '')}-${Date.now()}.json`, data, (err) => {
    if (err) throw err
  })
}

export const generateMRF = async (file: File) => {
  const arr = await file.arrayBuffer()
  const decoder = new TextDecoder('utf-8')
  const stringData = decoder.decode(arr)

  const { data, errors } = Papa.parse(stringData, { header: false, skipEmptyLines: true })
  const header = data.shift()

  const jsonMF = [] as Array<IOONRates>

  data.forEach((row: any) => {
    const reporting_entity = new ReportingEntity({ reporting_entity_name: row[14], reporting_entity_type: row[15] })
    const provider = new Provider({ billed_charge: row[4] })
    const outOfNetworkPayment = new OutOfNetworkPayment({ allowed_amount: row[5], providers: provider })
    const allowedAmount = new AllowedAmount({ billing_class: row[21], payments: outOfNetworkPayment })
    const out_of_network = new OutOfNetwork({ allowed_amounts: allowedAmount })
    const plan = new Plan({ plan_name: row[18], plan_id: row[19] })
    const tempOONRates = new OONRates({ last_updated_on: row[11], reporting_entity, out_of_network, plan })

    jsonMF.push(tempOONRates)
  })

  return jsonMF
}
