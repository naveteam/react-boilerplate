import { useState, useCallback } from 'react'
import { useQuery } from 'react-query'

const defaultParams = {
  page: 1,
  perPage: 10
}

const usePagination = (queryKey, promiseFn, options = {}) => {
  const { initialParams = defaultParams, ...config } = options

  const [params, setParams] = useState(initialParams)

  const { page, perPage, sort, order, ...filters } = params

  const { data, isFetching } = useQuery([queryKey, params], (_, params) => promiseFn(params), config)

  const setFilters = useCallback(
    newFilters =>
      setParams(previous => ({
        page: 1,
        perPage: previous.perPage,
        sort: previous.sort,
        order: previous.order,
        ...newFilters
      })),
    []
  )

  const setPage = useCallback(
    newPage =>
      setParams(previous => ({
        ...previous,
        page: newPage
      })),
    []
  )

  const nextPage = useCallback(
    () =>
      setParams(previous => ({
        ...previous,
        page: previous.page + 1
      })),
    []
  )

  const previousPage = useCallback(
    () =>
      setParams(previous => ({
        ...previous,
        page: previous.page - 1
      })),
    []
  )

  const setPerPage = useCallback(
    newPerPage =>
      setParams(previous => ({
        ...previous,
        page: 1,
        perPage: newPerPage
      })),
    []
  )

  const handleSort = useCallback(
    newSort =>
      setParams(({ sort, order, ...previous }) => ({
        ...previous,
        page: 1,
        ...(newSort !== sort && { sort: newSort, order: 'asc' }),
        ...(newSort === sort && order === 'asc' && { sort: newSort, order: 'desc' }),
        ...(newSort === sort && order === 'desc' && {})
      })),
    []
  )

  return {
    data,
    isFetching,
    setFilters,
    setPage,
    setPerPage,
    nextPage,
    previousPage,
    handleSort,
    page,
    perPage,
    sort,
    order,
    filters
  }
}

export default usePagination
