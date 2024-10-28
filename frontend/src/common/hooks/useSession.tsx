import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants'
import useGlobalStore from '~/stores'

export default function useSession() {
  const navigate = useNavigate()
  const { setAuth } = useGlobalStore()

  const login = () => {
    setAuth({ isAuthenticated: true })
    navigate(ROUTES.UploadPage)
  }

  const logout = () => {
    setAuth({ isAuthenticated: false })
    navigate(ROUTES.LandingPage)
  }

  return { login, logout }
}
