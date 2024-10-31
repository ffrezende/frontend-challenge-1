import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import fs from 'fs'
import { generateMRF } from './utils/index.js'

const uploadFolder = 'uploads'

const app = new Hono()
app.use('/*', cors())

app.post('/upload', async (c) => {
  try {
    const body = await c.req.parseBody()
    const file = body['file'] as File

    if (!file) {
      return c.text('No file uploaded.', 400)
    }

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true })
    }

    const OONRates = await generateMRF(file)
    const jsonString = JSON.stringify(OONRates)

    fs.writeFile(`${uploadFolder}/${file.name.split('.')[0]}.json`, jsonString, (err) => {
      if (err) throw err
    })

    return c.json({ message: 'CSV file uploaded successfully!' })
  } catch (error) {
    console.error(error)
    return c.text('Error uploading file.', 500)
  }
})

serve({ fetch: app.fetch, port: 8080 })
console.log('Server is running on http://localhost:8080')
