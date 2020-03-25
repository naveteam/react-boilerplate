import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { styles } from 'theme'

const Theme = ({ theme = styles, children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

Theme.propTypes = {
  theme: PropTypes.object
}

export default Theme
