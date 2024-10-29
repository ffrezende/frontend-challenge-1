import { useForm } from '@mantine/form'
import { FileInput, Container, Group } from '@mantine/core'
import * as Papa from 'papaparse'

//TODO create interface for csv headers
interface Props {
  onChange: ({ data, error }) => any
}

const FileUpload = ({ onChange }: Props) => {
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
    const reader = new FileReader()

    reader.onload = (e) => {
      const csvData = e.target?.result
      const { data } = Papa.parse(csvData)
      onChange(data)
    }

    reader.readAsText(file)
  }

  return (
    <Container size="md">
      <Group>
        <FileInput label="Upload CSV File" placeholder="Select a file" accept=".csv" error={form.errors.file} {...form.getInputProps('file')} onChange={onChangeFile} />
      </Group>
    </Container>
  )
}

export default FileUpload
