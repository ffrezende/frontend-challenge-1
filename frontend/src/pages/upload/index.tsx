import { Group } from '@mantine/core'
import { FileInput } from '../../layout'

export default function UploadPage() {
  const handleFile = (fileData) => {
    debugger
  }
  return (
    <Group align="center" w={'100%'}>
      <FileInput onChange={handleFile} />
    </Group>
  )
}
