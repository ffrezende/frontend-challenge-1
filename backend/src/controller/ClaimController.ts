import type { Context } from 'hono'

import ClaimService from '../service/ClaimService.js'

class ClaimController {
  claimService: ClaimService

  constructor() {
    this.claimService = new ClaimService()
  }

  getListOfClaims = async (c: Context) => {
    try {
      const files = await this.claimService.getListOfClaims()

      return c.json({ files })
    } catch (error: any) {
      const { message, status } = error
      return c.text(message, status)
    }
  }

  getClaimByName = async (c: Context) => {
    const filename = c.req.param('filename')

    try {
      const jsonData = this.claimService.getClaimByName(filename)

      return c.json(jsonData)
    } catch (error: any) {
      const { message, status } = error
      return c.text(message, status)
    }
  }

  uploadClaimFile = async (c: Context) => {
    try {
      const body = await c.req.parseBody()
      const file = body['file'] as File

      if (!file) {
        return c.text('No file uploaded.', 400)
      }

      const response = this.claimService.uploadClaimFile(file)

      return c.json(response)
    } catch (error: any) {
      const { message, status } = error
      return c.text(message, status)
    }
  }
}

export default ClaimController
