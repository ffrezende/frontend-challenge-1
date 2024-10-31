import type { Context } from 'hono'
import { readdir } from 'fs/promises'
import { readFileSync } from 'fs'

import { UPLOAD_FOLDER } from '../common/constants/index.js'
import { generateMRF, saveFile } from '../utils/index.js'

class ClaimController {
  getListOfClaims = async (c: Context) => {
    try {
      const files = await readdir(UPLOAD_FOLDER)

      return c.json({ files })
    } catch (error) {
      console.error(error)
      return c.text('Error retrieving file list.', 500)
    }
  }

  getClaimByName = async (c: Context) => {
    const filename = c.req.param('filename')
    const filePath = `./uploads/${filename}` // Adjust the path as needed

    try {
      const fileContent = readFileSync(filePath, 'utf8')
      const jsonData = JSON.parse(fileContent)

      return c.json(jsonData)
    } catch (error) {
      console.error(error)
      return c.text('Error reading file', 500)
    }
  }

  uploadClaimFile = async (c: Context) => {
    try {
      const body = await c.req.parseBody()
      const file = body['file'] as File

      if (!file) {
        return c.text('No file uploaded.', 400)
      }

      const OONRates = await generateMRF(file)
      const jsonString = JSON.stringify(OONRates)

      await saveFile(file.name, jsonString)

      return c.json({ message: 'CSV file uploaded successfully!' })
    } catch (error) {
      console.error(error)
      return c.text('Error uploading file.', 500)
    }
  }
}

export default ClaimController
