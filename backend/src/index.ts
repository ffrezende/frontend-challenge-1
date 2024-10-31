import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { readdir } from 'fs/promises'

import { generateMRF, saveFile } from './utils/index.js'
import { uploadFolder } from './common/constants/index.js'
import { readFileSync } from 'fs'

const app = new Hono()
app.use('/*', cors())

app.post('/upload', async (c) => {
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
})

app.get('/list-files', async (c) => {
  try {
    const files = await readdir(uploadFolder)

    return c.json({ files })
  } catch (error) {
    console.error(error)
    return c.text('Error retrieving file list.', 500)
  }
})

app.get('/file/:filename', async (c) => {
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
})

serve({ fetch: app.fetch, port: 8080 })
console.log('Server is running on http://localhost:8080')
