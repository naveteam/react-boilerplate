import React, { useMemo } from 'react'
import styled from 'styled-components'
import { system } from 'styled-system'

import { styles } from 'theme'
import { getDeepKey } from 'helpers'

import Arrow from './Arrow'

const IconComponent = ({ name, color, onClick, ...props }) => {
  const Icon = useMemo(() => {
    switch (name) {
      case 'arrow':
        return Arrow
    }
  }, [name])

  const iconColor = getDeepKey(styles.colors, color)

  if (typeof onClick !== 'function') {
    return <Icon color={iconColor} {...props} />
  }

  return (
    <Button onClick={onClick}>
      <Icon color={iconColor} {...props} />
    </Button>
  )
}

const Button = styled.button`
  background: transparent;
`

export default IconComponent
