import { useNavigate } from 'react-router-dom'

import { ROUTES, SessionManagement } from '../../common/constants'
import { addSessionStorage, removeSessionStorage } from '~/utils/session/sessionStorage'
import useGlobalStore from '~/stores'

export default function useSession() {
  const navigate = useNavigate()
  const { setAuth } = useGlobalStore()

  const login = () => {
    setAuth({ isAuthenticated: true })
    addSessionStorage(SessionManagement.AuthToken, 'Bearer Example')
    navigate(ROUTES.UploadPage)
  }

  const logout = () => {
    setAuth({ isAuthenticated: false })
    removeSessionStorage(SessionManagement.AuthToken)
    navigate(ROUTES.LandingPage)
  }

  return { login, logout }
}
