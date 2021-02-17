import React from 'react'
import { node } from 'prop-types'

const TableBody = ({ children }) => <tbody>{children}</tbody>

TableBody.propTypes = {
  children: node
}

export default TableBody
