import { useForm } from '@mantine/form'
import { FileInput, Container, Group, useMantineTheme } from '@mantine/core'
import * as Papa from 'papaparse'
import { useState } from 'react'
import { csvHeaderSchema, csvRowSchema } from '~/utils/zod/schema'
import { TableHeader } from '~/common/constants'
import useGlobalStore from '~/stores'

//TODO create interface for csv headers
interface Props {
  onChange: ({ rows }) => any
}

const FileUpload = ({ onChange }: Props) => {
  const { colors } = useMantineTheme()
  const [currentFile, setCurrentFile] = useState()
  const { setUploadFile } = useGlobalStore()

  const form = useForm({
    initialValues: {
      file: null,
    },
  })

  const onChangeFile = (file) => {
    try {
      setUploadFile({ isFileUploading: true, fileName: file?.name })
      if (!file) {
        console.error('No file selected')
        return
      }
      setCurrentFile(file)
      const reader = new FileReader()

      reader.onload = (e) => {
        const csvData = e.target?.result
        const { data, errors } = Papa.parse(csvData, { skipEmptyLines: true })

        const headers = data?.shift()
        const { success, error } = csvHeaderSchema(headers)

        if (!success) {
          //create validation
        }

        const tableHeader = TableHeader()
        const rowsByCollumn = []

        data.forEach((row) => {
          const tempRow = {}
          row.forEach((element, index) => {
            const { field } = tableHeader[index]
            tempRow[field] = element
          })

          const validationResult = csvRowSchema.safeParse(tempRow)

          //create validation
          rowsByCollumn.push(tempRow)
        })

        onChange({ rows: rowsByCollumn })
        setUploadFile({ isFileUploading: false })
      }

      reader.readAsText(file)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container size="md">
      <Group>
        <FileInput
          color={colors.royalGreen[5]}
          w={'100%'}
          placeholder="Select a file"
          accept=".csv"
          error={form.errors.file}
          {...form.getInputProps('file')}
          onChange={onChangeFile}
          value={currentFile}
        />
      </Group>
    </Container>
  )
}

export default FileUpload
