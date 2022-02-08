import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Column from 'components/Column'
import { useRifm } from 'rifm'
import Text from 'components/Text'

import { useController } from 'react-hook-form'

const InputComponent = ({
  label,
  name,
  placeholder,
  disabled,
  mask,
  defaultValue = '',
  type = 'text',
  rules,
  ...props
}) => {
  const {
    field: { ref, value, onChange, ...field },
    fieldState: { error }
  } = useController({ name, rules, defaultValue })

  const defaultMask = useMemo(
    () => ({
      format: str => str,
      append: str => str,
      accept: /./g,
      ...mask
    }),
    [mask]
  )

  const rifm = useRifm({
    value,
    onChange,
    ...defaultMask
  })

  return (
    <Column {...props}>
      {label && <Text mb={5}>{label}</Text>}
      <Column height={60} position='relative'>
        <Input {...field} {...rifm} type={type} error={error} placeholder={placeholder} />
        <Text position='absolute' bottom={0} color='red' variant='small'>
          {error?.message}
        </Text>
      </Column>
    </Column>
  )
}

const Input = styled.input`
  height: 40px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px 8px;
`

InputComponent.defaultProps = {
  width: 'regular',
  mb: 10
}

InputComponent.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  mask: PropTypes.shape({
    format: PropTypes.func,
    append: PropTypes.func,
    accept: PropTypes.instanceOf(RegExp)
  })
}

export default InputComponent
