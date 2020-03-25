import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, color } from 'styled-system'

import { MEDIADESKTOP } from 'helpers'

const Row = styled.div(
  ({ flex, flexWrap, alignItems, justifyContent }) => `
  display: flex;
  ${flex ? `flex: ${flex};` : ''}
  ${flexWrap ? 'flex-wrap: wrap;' : ''}
  ${alignItems ? `align-items: ${alignItems};` : ''}
  ${justifyContent ? `justify-content: ${justifyContent};` : ''}
`,
  space,
  layout,
  color
)

Row.propTypes = {
  flex: PropTypes.number,
  flexWrap: PropTypes.bool,
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
