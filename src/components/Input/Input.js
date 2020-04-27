import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Column from 'components/Column'
import Text from 'components/Text'

const InputComponent = ({ label, name, register, placeholder, error, disabled, type, ...props }) => (
  <Column {...props}>
    {label && <Text mb={5}>{label}</Text>}
    <Column height={60} position='relative'>
      <Input name={name} ref={register} placeholder={placeholder} error={error} type={type} />
      <Text position='absolute' bottom={0} color='red' variant='small'>
        {error}
      </Text>
    </Column>
  </Column>
)

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
  disabled: PropTypes.bool
}

export default InputComponent
