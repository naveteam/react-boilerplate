import styled from 'styled-components'
import { space, layout, color, border, shadow, position } from 'styled-system'

const Svg = styled.svg`
  ${space}
  ${layout}
  ${color}
  ${border}
  ${shadow}
  ${position}
  ${({ transform }) => transform && `transform: ${transform};`}
  ${({ transition }) => transition && `transition: ${transition};`}
`

export default Svg
