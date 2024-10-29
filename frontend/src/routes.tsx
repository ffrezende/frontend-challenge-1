import { createBrowserRouter } from 'react-router-dom'

import { BasicLayout } from './layout'
import { ROUTES, SessionManagement } from './common/constants'
import { LandingPage, NotFoundPage, UploadPage } from './pages'

import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from './stores'
import { getSessionStorage } from './utils/sessionStorage'

interface Props {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: Props): React.ReactElement => {
  const navigate = useNavigate()
  const {
    auth: { isAuthenticated },
    setAuth,
  } = useGlobalStore()

  useEffect(() => {
    if (!isAuthenticated) {
      const authToken = getSessionStorage(SessionManagement.AuthToken)
      if (!!authToken) {
        setAuth({ isAuthenticated: true })
      } else {
        navigate(ROUTES.LandingPage)
      }
    }
  }, [isAuthenticated])

  //TODO: create a not authorized page
  return <>{isAuthenticated && children}</>
}

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      { path: ROUTES.LandingPage, element: <LandingPage /> },
      {
        path: ROUTES.UploadPage,
        element: <UploadPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
])

export default router
