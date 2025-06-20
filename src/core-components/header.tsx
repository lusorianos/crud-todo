import Container from "../components/container"
import Logo from "../assets/images/logo.svg?react"

export default function Header() {
  return (
    <Container as="header" className="pt-3 md:pt-20">
      <Logo className="h-9 md:h-12" />
    </Container>
  )
}