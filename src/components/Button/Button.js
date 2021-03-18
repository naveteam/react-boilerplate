import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, typography, color, border } from 'styled-system'
import propTypes from '@styled-system/prop-types'

import Loader from 'components/Loader'

const ButtonComponent = ({ children, disabled, isLoading, ...props }) => (
  <Button {...props} disabled={disabled || isLoading}>
    {isLoading ? <Loader /> : children}
  </Button>
)

const Button = styled.button(space, layout, typography, color, border)

ButtonComponent.defaultProps = {
  width: 'regular',
  height: 'small',
  borderRadius: 4,
  color: 'white',
  backgroundColor: 'primary.main'
}

ButtonComponent.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default ButtonComponent
