import React from 'react'

export default ({ name, disabled }) => (
  <button type='button' disabled={disabled}>
    {name} {disabled && 'isDisabled'}
  </button>
)
