import React from 'react'
import { node } from 'prop-types'

const TableHead = ({ children }) => <thead>{children}</thead>

TableHead.propTypes = {
  children: node
}

export default TableHead
