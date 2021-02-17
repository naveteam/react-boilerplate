import React, { useState, useRef, forwardRef } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import Row from 'components/Row'
import Column from 'components/Column'
import Input from 'components/Input'
import Text from 'components/Text'

import { mergeRefs } from 'helpers'
import { useOnClickOutside } from 'hooks'

const Select = forwardRef(({ label, name, options, onChange, error, value, ...props }, ref) => {
  const [isSelectOptionsOpen, setIsSelectOptionsOpen] = useState(false)
  const inputRef = useRef(null)
  const optionsRef = useRef(null)

  const handleSetOptions = item => {
    onChange(item)
    setIsSelectOptionsOpen(false)
  }

  useOnClickOutside(() => setIsSelectOptionsOpen(false), inputRef, optionsRef)

  return (
    <Column width={1} minHeight={77} position='relative'>
      <Input
        width='large'
        label={label}
        name={name}
        ref={mergeRefs(inputRef, ref)}
        onClick={() => setIsSelectOptionsOpen(!isSelectOptionsOpen)}
        cursor='pointer'
        isSelect
        value={value?.label || ''}
        error={error}
        {...props}
      />
      <OptionsWrapper
        left={0}
        width={1}
        mt={57}
        zIndex={3}
        ref={optionsRef}
        position='absolute'
        boxSizing='border-box'
        backgroundColor='white'
        border='1px solid'
        borderTop='none'
        borderBottomLeftRadius={4}
        borderBottomRightRadius={4}
        isSelectOptionsOpen={isSelectOptionsOpen}
      >
        <Column width={1} height='100%'>
          {!!options && options.length !== 0 ? (
            options.map(item => (
              <OptionContainer
                key={item.value}
                pl={10}
                minHeight={35}
                width={1}
                cursor='pointer'
                alignItems='center'
                onClick={() => handleSetOptions(item)}
                boxSizing='border-box'
              >
                <Text fontSize={14} m={0}>
                  {item.label}
                </Text>
              </OptionContainer>
            ))
          ) : (
            <Row width={1} justifyContent='center' alignItems='center' mb={15}>
              <Text fontSize={14}>Não há opções</Text>
            </Row>
          )}
        </Column>
      </OptionsWrapper>
    </Column>
  )
})

const OptionContainer = styled(Row)`
  cursor: pointer;
  &:hover {
    background-color: purple;
    p {
      color: white;
    }
  }
`

const OptionsWrapper = styled(Row)(
  ({ isSelectOptionsOpen }) => css`
    max-height: ${isSelectOptionsOpen ? '220px' : '0'};
    visibility: ${isSelectOptionsOpen ? 'visible' : 'hidden'};
    transition: all ease-in-out 0.4s;
    overflow-y: auto;
  `
)

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired,
  setOption: PropTypes.func,
  error: PropTypes.string
}

export default Select
