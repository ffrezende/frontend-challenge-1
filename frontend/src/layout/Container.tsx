import { Group, Text, Button, Container } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import useSession from '~/utils/hooks/useSession'

import useGlobalStore from '~/stores'
import { useEffect, useState } from 'react'
import { ROUTES } from '~/common/constants'
import { useNavigate } from 'react-router-dom'

export default function ContainerLayout({ children }) {
  const { colors } = useMantineTheme()
  const {
    app,
    auth: { isAuthenticated },
  } = useGlobalStore()
  const { logout } = useSession()
  const navigate = useNavigate()

  const links = [
    { link: ROUTES.UploadPage, label: 'Upload' },
    { link: ROUTES.ClaimsFiles, label: 'Claims Files' },
  ]
  const [active, setActive] = useState(links[0].link)

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className="mr-3"
      style={{ color: colors.royalGreen[0] }}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
        navigate(link.link)
      }}
    >
      {link.label}
    </a>
  ))

  return (
    <div>
      <Group p="lg" justify="space-between" bg={colors.royalGreen[5]}>
        <Group>
          <img src="/images/DevFraga.jpg" alt="Your Logo" className="w-10 h-10 mr-4" />
          <Text style={{ color: colors.royalGreen[0] }} size="xl">
            {app?.name}
          </Text>
        </Group>

        {isAuthenticated && (
          <div className="flex justify-center items-center">
            <Group gap={5} visibleFrom="xs">
              {items}
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
