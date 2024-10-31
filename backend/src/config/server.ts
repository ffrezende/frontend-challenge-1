import type { Hono } from 'hono'
import { serve } from '@hono/node-server'

const initServer = (app: Hono) => {
  const port = process.env.PORT

  serve({ fetch: app.fetch, port: 8080 })
  console.log('Server is running on http://localhost:8080')
}

export default initServer
