import { Button, Group, List, ListItem, Space, Text } from '@mantine/core'
import useClaimFiles from '~/utils/hooks/useClaimFiles'
import useFileManagement from '~/utils/hooks/useFileManagement'

export default function ClaimsFilePage() {
  const { files } = useClaimFiles()
  const { handleDownloadFile } = useFileManagement()

  return (
    <div>
      <List>
        {files.map((file) => (
          <ListItem key={file}>
            <Group p={'md'}>
              <Text w={500}>{file}</Text>
              <Space w="xs" />
              <Group>
                <Button variant="outline" size="xs" onClick={async () => handleDownloadFile(file)}>
                  Download
                </Button>
              </Group>
            </Group>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
