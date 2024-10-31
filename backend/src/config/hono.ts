import { Hono } from 'hono'
import { cors } from 'hono/cors'

const HonoConfig = () => {
  const app = new Hono()
  app.use('/*', cors())

  return app
}
export default HonoConfig
