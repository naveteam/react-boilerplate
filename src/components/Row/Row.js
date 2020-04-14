import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, color, flexbox } from 'styled-system'

import { MEDIADESKTOP } from 'helpers'

const Row = styled.div(
  {
    display: 'flex'
  },
  flexbox,
  space,
  layout,
  color
)

Row.propTypes = {
  flex: PropTypes.number,
  flexWrap: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string
}

export const RowDesktop = styled(Row)`
  display: none;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: flex;
  }
`

export const RowMobile = styled(Row)`
  display: flex;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: none;
  }
`

export default Row
