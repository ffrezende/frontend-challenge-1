import { readdir } from 'fs/promises'
import { UPLOAD_FOLDER } from '../common/constants/index.js'
import ErrorHandler from '../common/error/index.js'
import { readFileSync } from 'fs'
import { generateMRF, saveFile } from '../utils/index.js'

class ClaimService {
  getListOfClaims = async () => {
    try {
      const files = await readdir(UPLOAD_FOLDER)

      return files
    } catch (error: any) {
      throw ErrorHandler.handleError(error)
    }
  }

  getClaimByName = async (filename: string) => {
    const filePath = `./uploads/${filename}`

    try {
      const fileContent = readFileSync(filePath, 'utf8')
      const jsonData = JSON.parse(fileContent)

      return jsonData
    } catch (error: any) {
      throw ErrorHandler.handleError(error)
    }
  }

  uploadClaimFile = async (file: File) => {
    try {
      const OONRates = await generateMRF(file)
      const jsonString = JSON.stringify(OONRates)

      await saveFile(file.name, jsonString)

      return { message: 'CSV file uploaded successfully!' }
    } catch (error: any) {
      throw ErrorHandler.handleError(error)
    }
  }
}

export default ClaimService
