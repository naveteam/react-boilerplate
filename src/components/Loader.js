import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ children = 'carregando' }) => <p>{children}</p>

Loader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default Loader
