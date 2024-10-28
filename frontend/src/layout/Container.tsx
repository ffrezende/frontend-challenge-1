import { Group, Text, Button } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'

export default function Container({ children }) {
  const theme = useMantineTheme()

  return (
    <div>
      <Group p="md" justify="space-between" bg={theme.colors.royalGreen[0]}>
        <Group>
          <img src="/images/DevFraga.jpg" alt="Your Logo" className="w-10 h-10 mr-4" />
          <Text size="xl">Dev Fraga Multi Parser</Text>
        </Group>

        <Button variant="outline" color={theme.colors.royalGreen[5]}>
          Sign Out
        </Button>
      </Group>

      <div className="container">{children}</div>

      <footer className="flex justify-center items-center h-10 fixed bottom-0 left-0 right-0">
        <Group bg={theme.colors.royalGreen[0]} w={'100%'} h={40} justify="center">
          <Text size="sm">©Dev Fraga</Text>
        </Group>
      </footer>
    </div>
  )
}
