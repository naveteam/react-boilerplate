import PropTypes from 'prop-types'
import styled from 'styled-components'

import Row from 'components/Row'

import { MEDIADESKTOP } from 'helpers'

const Column = styled(Row)`
  flex-direction: column;
`

Column.propTypes = {
  flex: PropTypes.number,
  flexWrap: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string
}

export const ColumnDesktop = styled(Column)`
  display: none;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: flex;
  }
`

export const ColumnMobile = styled(Column)`
  display: flex;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: none;
  }
`

export default Column
