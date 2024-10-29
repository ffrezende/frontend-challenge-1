import { useForm } from '@mantine/form'
import { FileInput, Container, Group, useMantineTheme } from '@mantine/core'
import * as Papa from 'papaparse'
import { useState } from 'react'

//TODO create interface for csv headers
interface Props {
  onChange: ({ headers, rows }) => any
}

const FileUpload = ({ onChange }: Props) => {
  const { colors } = useMantineTheme()
  const [currentFile, setCurrentFile] = useState()

  const form = useForm({
    initialValues: {
      file: null,
    },
  })

  const onChangeFile = (file) => {
    if (!file) {
      console.error('No file selected')
      return
    }
    setCurrentFile(file)
    const reader = new FileReader()

    reader.onload = (e) => {
      const csvData = e.target?.result
      const { data } = Papa.parse(csvData, { skipEmptyLines: true })

      const headers = data?.shift()
      const tempHeader = headers.map((header) => ({ field: header, sortable: true, filter: true }))
      const rowByCollumn = []

      data.forEach((row) => {
        const tempRow = {}
        row.forEach((element, index) => {
          const { field } = tempHeader[index]
          tempRow[field] = element
        })

        rowByCollumn.push(tempRow)
      })

      onChange({ headers: tempHeader, rows: rowByCollumn })
    }

    reader.readAsText(file)
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
