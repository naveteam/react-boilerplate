import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, typography, color, variant } from 'styled-system'

const BIG = 'big'
const MEDIUM = 'medium'
const REGULAR = 'regular'
const SMALL = 'small'
const TINY = 'tiny'

const Text = styled.p(
  variant({
    variants: {
      [BIG]: {
        fontSize: 24,
        lineHeight: '29px'
      },
      [MEDIUM]: {
        fontSize: 20,
        lineHeight: '24px'
      },
      [REGULAR]: {
        fontSize: 16,
        lineHeight: '25px'
      },
      [SMALL]: {
        fontSize: 14,
        lineHeight: '17px'
      },
      [TINY]: {
        fontSize: 12,
        lineHeight: '17px'
      }
    }
  }),
  space,
  layout,
  typography,
  color
)

Text.propTypes = {
  variant: PropTypes.oneOf([BIG, MEDIUM, REGULAR, SMALL, TINY]),
  textAlign: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Text
