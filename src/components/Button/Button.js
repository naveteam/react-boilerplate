import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, typography, color } from 'styled-system'

const ButtonComponent = ({ children, ...props }) => <Button {...props}>{children}</Button>

const Button = styled.button(space, layout, typography, color)

ButtonComponent.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool
}

export default ButtonComponent
