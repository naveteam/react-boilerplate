import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import Column from 'components/Column'
import Paginator from 'components/Paginator'
import { Table, TableBody, TableCell, TableHead, TableRow } from 'components/Table'
import UsersFilters from './UsersFilters'

import { usePagination } from 'hooks'

import { getUsers } from 'services/users'

const UsersList = () => {
  const { data, handleSort, isLoading, order, page, setPage, sort, filters, setFilters } = usePagination(
    ['users'],
    getUsers
  )
  const history = useHistory()

  return (
    <Column alignItems='center'>
      <UsersFilters filters={filters} setFilters={setFilters} />
      <Table width='100%' isLoading={isLoading}>
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
          {data?.results?.map(user => (
            <TableRow onClick={() => history.push(`/usuarios/${user.id}`)} key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.formattedCreatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginator onChangePage={setPage} currentPage={page} pageCount={data?.pageCount} mt={24} />
    </Column>
  )
}

export default UsersList
