import React from 'react'
import styled, { css } from 'styled-components'
import { createPortal } from 'react-dom'

import Row from 'components/Row'
import Column from 'components/Column'

const Modal = ({ isOpen, children, ...props }) => {
  const portalRef = document.body

  return createPortal(
    <ModalBackground
      top={0}
      left={0}
      position='fixed'
      width='100%'
      height='100vh'
      isOpen={isOpen}
      alignItems='center'
      justifyContent='center'
      backgroundColor='rgba(0,0,0,0.35)'
      p={15}
    >
      <Column backgroundColor='white' p={30} borderRadius={5} {...props}>
        {children}
      </Column>
    </ModalBackground>,
    portalRef
  )
}

const ModalBackground = styled(Row)(
  ({ isOpen }) => css`
    visibility: ${isOpen ? 'visible' : 'hidden'};
    opacity: ${isOpen ? 1 : 0};
  `
)

export default Modal
