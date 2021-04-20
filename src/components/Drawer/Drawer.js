import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

const NAV_BAR_HEIGHT = 60
const SIDE_BAR_WIDTH = 200
const ROUTES = [
  {
    path: '/usuarios',
    label: 'Usuários'
  },
  {
    path: '/usuarios/criar',
    label: 'Criar usuário'
  }
]

const DrawerComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Container>
      <NavBar>
        <BurgerMenu src='/menu.png' onClick={() => setIsOpen(!isOpen)} />
      </NavBar>
      <SideBar isOpen={isOpen}>
        {ROUTES.map(route => (
          <Link key={route.path} to={route.path}>
            {route.label}
          </Link>
        ))}
      </SideBar>
      <Content isOpen={isOpen}>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const Content = styled.div`
  padding: 20px;
  padding-top: ${NAV_BAR_HEIGHT + 20}px;
  padding-left: ${({ isOpen }) => (isOpen ? SIDE_BAR_WIDTH + 20 : 20)}px;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  background-color: #fafafa;
  transition: all 0.3s ease-in-out;
`

const Link = styled(RouterLink)`
  color: black;
  text-decoration: none;
`

const NavBar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: ${NAV_BAR_HEIGHT}px;
  width: 100%;
  z-index: 2;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.primary.main};
`

const BurgerMenu = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`

const SideBar = styled.div`
  ${({ isOpen, theme }) => css`
    position: absolute;
    height: 100%;
    background-color: white;
    border-right: 1px solid lightgray;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    ${isOpen
      ? css`
          width: ${SIDE_BAR_WIDTH}px;
          padding: 20px;
          padding-top: ${NAV_BAR_HEIGHT + 20}px;
        `
      : css`
          width: 0px;
        `};
  `}
`

export default DrawerComponent
