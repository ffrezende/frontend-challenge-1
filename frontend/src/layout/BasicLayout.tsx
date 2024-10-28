import { Outlet } from 'react-router-dom'

import { Container } from '../layout'

export default function BasicLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}
