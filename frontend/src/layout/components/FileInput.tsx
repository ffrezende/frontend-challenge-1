import { useForm } from '@mantine/form'
import { FileInput, Container, Group, useMantineTheme } from '@mantine/core'
import * as Papa from 'papaparse'
import { useState, useCallback } from 'react'
import { csvHeaderSchema, csvRowSchema } from '~/utils/zod/schema'
import { TableHeader } from '~/common/constants'
import useGlobalStore from '~/stores'

interface FileUploadProps {
  onChange: (rows: any[]) => void
}

const FileUpload = ({ onChange }: FileUploadProps) => {
  const { colors } = useMantineTheme()

  const {
    setUploadFile,
    app: { currentfile },
  } = useGlobalStore()

  const form = useForm({
    initialValues: { file: null },
  })

  const handleFileChange = useCallback(async (file: File | null) => {
    try {
      if (!file) {
        console.error('No file selected')
        return
      }
      setUploadFile({ isFileUploading: true, fileName: file?.name, currentfile: file })

      const csvData = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result)
        reader.onerror = reject
        reader.readAsText(file)
      })

      const { data, errors } = Papa.parse(csvData, { skipEmptyLines: true })

      const headers = data?.shift() as string[] // Type assertion for headers
      const validatedHeaders = csvHeaderSchema(headers)

      if (!validatedHeaders.success) {
        console.error('Invalid CSV headers:', validatedHeaders.error)
        return
      }

      const tableHeader = TableHeader()
      const rowsByCollumn = []

      data.forEach((row) => {
        const tempRow = {}
        row.forEach((element, index) => {
          const { field } = tableHeader[index]
          tempRow[field] = element
        })

        const validatedRow = csvRowSchema.safeParse(tempRow)

        if (!validatedRow.success) {
          // Handle row validation errors
          console.error('Invalid CSV row:', validatedRow.error)
          return null
        }

        rowsByCollumn.push(tempRow)
      })

      onChange(rowsByCollumn)
      setUploadFile({ isFileUploading: false })
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <Container size="md">
      <Group>
        <FileInput
          color={colors.royalGreen[5]}
          w="100%"
          placeholder="Select a file"
          accept=".csv"
          error={form.errors.file}
          {...form.getInputProps('file')}
          onChange={handleFileChange}
          value={currentfile}
        />
      </Group>
    </Container>
  )
}

export default FileUpload
