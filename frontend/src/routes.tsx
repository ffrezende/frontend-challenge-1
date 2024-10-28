import { createBrowserRouter } from 'react-router-dom'

import { BasicLayout } from './layout'
import { ROUTES } from './common/constants'
import { LandingPage, NotFoundPage } from './pages'

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      { path: ROUTES.LandingPage, element: <LandingPage /> },
      { path: ROUTES.UploadPage, element: <LandingPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
])

export default router
