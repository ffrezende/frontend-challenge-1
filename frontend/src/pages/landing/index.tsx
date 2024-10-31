import { Button, useMantineTheme } from '@mantine/core'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/common/constants'
import useGlobalStore from '~/stores'
import useSession from '~/utils/hooks/useSession'

export default function LandingPage() {
  const { colors } = useMantineTheme()
  const { app } = useGlobalStore()
  const { login } = useSession()
  const navigate = useNavigate()

  const handleClaimedFiles = useCallback(() => {
    navigate(ROUTES.ClaimsFiles)
  }, [])

  return (
    <div className="flex-col justify-center items-center w-full text-center md:h-[500px]">
      <div>
        <div>Welcome to {app.name}</div>
        <Button onClick={login} variant="outline" m={'lg'} color={colors.royalGreen[5]}>
          Sign In
        </Button>
        <div>
          <div>Check the Claimed Files</div>
          <Button onClick={handleClaimedFiles} variant="outline" m={'lg'} color={'white'} bg={colors.royalGreen[5]} w={200}>
            Claimed Files
          </Button>
        </div>
      </div>
    </div>
  )
}
