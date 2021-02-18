import React from 'react'

import Column from 'components/Column'
import { Table, TableBody, TableCell, TableHead, TableRow } from 'components/Table'

import { usePagination } from 'hooks'

import { getUsers } from 'services/auth'

const { format } = Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })

const UsersList = () => {
  const { data, handleSort, order, sort } = usePagination('users', getUsers)

  return (
    <Column p={80}>
      <Table width='100%'>
        <TableHead>
          <TableRow>
            <TableCell head name='name' order={order} onSort={handleSort} sort={sort}>
              Nome
            </TableCell>
            <TableCell head name='email'>
              E-mail
            </TableCell>
            <TableCell head name='created_at' order={order} onSort={handleSort} sort={sort}>
              Criado em
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(data ?? []).map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{format(new Date(user.created_at))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Column>
  )
}

export default UsersList
