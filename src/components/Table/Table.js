import React from 'react'
import styled from 'styled-components'
import { size, space } from 'styled-system'

import Loader from 'components/Loader'

const TableComponent = ({ isLoading, children, ...props }) => (
  <Table {...props}>
    {children}
    {isLoading && (
      <tbody>
        <tr>
          <th colSpan='999' align='center'>
            <Loader />
          </th>
        </tr>
      </tbody>
    )}
  </Table>
)

const Table = styled.table`
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  font-family: sans-serif;
  font-size: 14px;
  overflow: hidden;
  background-color: white;
  tbody {
    color: #757575;

    tr {
      border-top: 1px solid #d3d3d3;
    }

    tr:nth-child(odd) {
      background-color: #fafafa;
    }
  }

  td,
  th {
    width: 100px;
    padding: 16px 24px;
  }

  th {
    cursor: pointer;

    :hover {
      background-color: #fafafa;
    }

    span:nth-child(2) {
      float: right;
    }
  }

  ${size}
  ${space}
`

export default TableComponent
