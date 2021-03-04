import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Datepicker from 'react-datepicker'

import Column from 'components/Column'
import Text from 'components/Text'

const DatepickerComponent = forwardRef(
  ({ label, error, containerProps, dateFormat = 'dd/MM/yyyy', value, ...props }, ref) => {
    return (
      <Column {...containerProps}>
        {label && <Text mb={5}>{label}</Text>}
        <Column height={60} position='relative'>
          <StyledDatepicker ref={ref} dateFormat={dateFormat} selected={value} {...props} />
          <Text position='absolute' bottom={0} color='red' variant='small'>
            {error}
          </Text>
        </Column>
      </Column>
    )
  }
)

const StyledDatepicker = styled(Datepicker)`
  height: 40px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px 8px;
  width: 100%;
`

DatepickerComponent.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  containerProps: PropTypes.object,
  dateFormat: PropTypes.string
}

export default DatepickerComponent
