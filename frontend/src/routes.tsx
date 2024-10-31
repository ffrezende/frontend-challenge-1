import { createBrowserRouter } from 'react-router-dom'

import { BasicLayout } from './layout'
import { ROUTES, SessionManagement } from './common/constants'
import { ClaimsFilePage, LandingPage, NotFoundPage, UploadPage } from './pages'

import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from './stores'
import { getSessionStorage } from './utils/session/sessionStorage'
import NotAuthorizedPage from './pages/error/NotAuthorized'

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
    //TODO: mobx is not persist when F5, create validation with mobx persist
    if (!isAuthenticated) {
      const authToken = getSessionStorage(SessionManagement.AuthToken)
      if (!!authToken) {
        setAuth({ isAuthenticated: true })
      } else {
        navigate(ROUTES.NotAuthorized)
      }
    }
  }, [isAuthenticated])

  return <>{isAuthenticated && children}</>
}

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      { path: ROUTES.LandingPage, element: <LandingPage /> },
      {
        path: ROUTES.UploadPage,
        element: (
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.ClaimsFiles,
        element: <ClaimsFilePage />,
      },
      {
        path: ROUTES.NotAuthorized,
        element: <NotAuthorizedPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
])

export default router
