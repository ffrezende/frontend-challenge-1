import { Button, useMantineTheme } from '@mantine/core'
import useGlobalStore from '~/stores'
import useSession from '~/utils/hooks/useSession'

export default function LandingPage() {
  const theme = useMantineTheme()
  const { app } = useGlobalStore()
  const { login } = useSession()

  return (
    <div className="flex-col justify-center items-center w-full text-center">
      <div>Welcome to {app.name}</div>
      <Button onClick={login} variant="outline" m={'lg'} color={theme.colors.royalGreen[5]}>
        Sign In
      </Button>
    </div>
  )
}
