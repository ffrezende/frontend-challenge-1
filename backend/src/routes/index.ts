import { Hono } from 'hono'

import ClaimController from '../controller/ClaimController.js'

const createRoutes = (app: Hono) => {
  const claimController = new ClaimController()

  app.post('/upload', claimController.uploadClaimFile)
  app.get('/list-of-claim', claimController.getListOfClaims)
  app.get('/claim/:filename', claimController.getClaimByName)
}

export default createRoutes
