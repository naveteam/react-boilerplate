import React from 'react'
import { bool, func, node, string } from 'prop-types'

const TableCell = ({ children, head, name, order, onSort, sort }) => {
  const handleClickSort = () => {
    if (typeof onSort === 'function') {
      onSort(name)
    }
  }

  if (head) {
    return (
      <th align='left' onClick={handleClickSort}>
        <span>{children}</span>
        {sort === name && <span>{order === 'asc' ? '▲' : '▼'}</span>}
      </th>
    )
  }

  return <td>{children}</td>
}

TableCell.propTypes = {
  children: node,
  head: bool,
  name: string,
  order: string,
  onSort: func,
  sort: string
}

export default TableCell
