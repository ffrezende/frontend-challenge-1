import HonoConfig from './config/hono.js'
import initServer from './config/server.js'
import createRoutes from './routes/index.js'

const service = async () => {
  const app = HonoConfig()
  createRoutes(app)
  initServer(app)
}

service()
