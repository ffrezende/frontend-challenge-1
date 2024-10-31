import Papa from 'papaparse'
import fs from 'fs'
import type { OONRates } from '../common/interface/index.js'
import { uploadFolder } from '../common/constants/index.js'

export const saveFile = async (filePath: string, data: string) => {
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true })
  }

  fs.writeFile(`${uploadFolder}/${filePath.split('.')[0].replace(/\s/g, '')}-${Date.now()}.json`, data, (err) => {
    if (err) throw err
  })
}

export const generateMRF = async (file: File) => {
  const arr = await file.arrayBuffer()
  const decoder = new TextDecoder('utf-8')
  const stringData = decoder.decode(arr)

  const { data, errors } = Papa.parse(stringData, { header: false, skipEmptyLines: true })
  const header = data.shift()

  const jsonMF = [] as Array<OONRates>

  data.forEach((row: any) => {
    const tempRow: OONRates = {
      reporting_entity: { reporting_entity_name: row[14], reporting_entity_type: row[15] },
      last_updated_on: row[11],
      out_of_network: { allowed_amounts: { billing_class: row[21], payments: { allowed_amount: row[5], providers: { billed_charge: row[4] } } } },
      plan: { plan_name: row[18], plan_id: row[19] },
    }
    jsonMF.push(tempRow)
  })

  return jsonMF
}
