import React, { useState, useRef, forwardRef, useMemo } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import Row from 'components/Row'
import Column from 'components/Column'
import Text from 'components/Text'
import Icon from 'components/Icon'

import { useOnClickOutside } from 'hooks'
import { mergeRefs } from 'helpers'

const Select = forwardRef(({ label, name, options, onChange, error, value, placeholder, ...props }, ref) => {
  const [isSelectOptionsOpen, setIsSelectOptionsOpen] = useState(false)
  const inputRef = useRef(null)
  const optionsRef = useRef(null)

  const handleChangeOption = item => {
    onChange(item.value)
    setIsSelectOptionsOpen(false)
  }

  const selectedOption = useMemo(() => options?.find(item => item.value === value), [options, value])

  useOnClickOutside(() => setIsSelectOptionsOpen(false), inputRef, optionsRef)

  return (
    <Column width='100%' minHeight={77} position='relative' {...props}>
      <Column>
        {label && <Text mb={5}>{label}</Text>}
        <Column height={60} position='relative'>
          <Row
            alignItems='center'
            justifyContent='space-between'
            onClick={() => setIsSelectOptionsOpen(!isSelectOptionsOpen)}
            height={40}
            border='1px solid black'
            borderRadius={4}
            padding='4px 8px'
            ref={mergeRefs(inputRef, ref)}
            cursor='pointer'
            backgroundColor='white'
          >
            <Text opacity={!selectedOption ? 0.6 : 1} fontSize='13px' fontWeight={400} fontFamily='Arial'>
              {!selectedOption ? placeholder : selectedOption.label}
            </Text>
            <Icon
              name='arrow'
              transition='all 0.2s linear'
              style={{ transform: isSelectOptionsOpen ? 'rotateZ(-90deg)' : 'rotateZ(90deg)' }}
            />
          </Row>
          <Text position='absolute' bottom={0} color='red' variant='small'>
            {error}
          </Text>
        </Column>
      </Column>
      <OptionsWrapper
        left={0}
        width='100%'
        mt={70}
        zIndex={3}
        ref={optionsRef}
        position='absolute'
        backgroundColor='white'
        border='1px solid'
        borderTop='none'
        borderBottomLeftRadius={4}
        borderBottomRightRadius={4}
        isSelectOptionsOpen={isSelectOptionsOpen}
      >
        <Column width='100%' height='100%'>
          {!!options && options.length !== 0 ? (
            options.map(item => (
              <OptionContainer
                key={item.value}
                pl={10}
                minHeight={35}
                width='100%'
                cursor='pointer'
                alignItems='center'
                onClick={() => handleChangeOption(item)}
              >
                <Text fontSize={14} m={0}>
                  {item.label}
                </Text>
              </OptionContainer>
            ))
          ) : (
            <Row width='100%' justifyContent='center' alignItems='center' mb={15}>
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
    overflow-y: auto;
  `
)

Select.defaultProps = {
  options: []
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string
}

export default Select
