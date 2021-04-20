import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MaskedInput from 'react-text-mask'

import Column from 'components/Column'
import Text from 'components/Text'

import { mergeRefs } from 'helpers'

const InputComponent = forwardRef(({ label, name, placeholder, error, disabled, type, mask, ...props }, ref) => (
  <Column {...props}>
    {label && <Text mb={5}>{label}</Text>}
    <Column height={60} position='relative'>
      {!mask ? (
        <Input name={name} ref={ref} placeholder={placeholder} error={error} type={type} />
      ) : (
        <MaskedInput
          mask={mask}
          name={name}
          placeholder={placeholder}
          error={error}
          type={type}
          render={(maskedRef, inputProps) => <Input ref={mergeRefs(maskedRef, ref)} {...inputProps} />}
        />
      )}
      <Text position='absolute' bottom={0} color='red' variant='small'>
        {error}
      </Text>
    </Column>
  </Column>
))

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
  register: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  mask: PropTypes.array
}

export default InputComponent
