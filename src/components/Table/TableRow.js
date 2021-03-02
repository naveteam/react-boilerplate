import React from 'react'
import { node } from 'prop-types'

const TableRow = ({ children, ...props }) => <tr {...props}>{children}</tr>

TableRow.propTypes = {
  children: node
}

export default TableRow
