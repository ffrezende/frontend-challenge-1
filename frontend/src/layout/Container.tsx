import { Group, Text, Button, Container } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import useSession from '~/utils/hooks/useSession'

import useGlobalStore from '~/stores'
import Menu from './Menu'

export default function ContainerLayout({ children }) {
  const {
    app,
    auth: { isAuthenticated },
  } = useGlobalStore()

  const { colors } = useMantineTheme()
  const { logout } = useSession()

  return (
    <div>
      <Group p="lg" justify="space-between" bg={colors.royalGreen[5]}>
        <Group className="cursor-pointer">
          <img src="/images/DevFraga.jpg" alt="Your Logo" className="w-10 h-10 mr-4" />
          <Text style={{ color: colors.royalGreen[0] }} size="xl">
            {app?.name}
          </Text>
        </Group>

        {isAuthenticated && (
          <div className="flex justify-center items-center">
            <Group gap={5} visibleFrom="xs">
              <Menu />
            </Group>
            <div className="ml-4">
              <Button onClick={logout} variant="outline" color={colors.royalGreen[0]}>
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </Group>

      <Container p={40}>{children}</Container>

      <footer className="flex justify-center items-center h-10 fixed bottom-0 left-0 right-0">
        <Group bg={colors.royalGreen[5]} w={'100%'} h={40} justify="center">
          <Text style={{ color: colors.royalGreen[0] }} size="sm">
            ©Dev Fraga
          </Text>
        </Group>
      </footer>
    </div>
  )
}
