import { useState } from 'react'
import { useMantineTheme } from '@mantine/core'
import { MenuLinks } from '~/common/constants'
import { useNavigate } from 'react-router-dom'

export default function Menu() {
  const { colors } = useMantineTheme()
  const navigate = useNavigate()
  const [active, setActive] = useState(MenuLinks[0].link)

  const items = MenuLinks.map((link) => (
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
  return <div>{items}</div>
}
