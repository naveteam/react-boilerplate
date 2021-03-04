import { useState, useCallback } from 'react'
import { useQuery } from 'react-query'

const defaultParams = {
  page: 1,
  pageSize: 10
}

const usePagination = (queryKey, promiseFn, options = {}) => {
  const { initialParams = defaultParams, ...config } = options

  const [params, setParams] = useState(initialParams)

  const { page, pageSize, sort, order, ...filters } = params

  const query = useQuery([queryKey, params], () => promiseFn(params), config)

  const setFilters = useCallback(
    newFilters =>
      setParams(previous => ({
        page: 1,
        pageSize: previous.pageSize,
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

  const setPageSize = useCallback(
    newPageSize =>
      setParams(previous => ({
        ...previous,
        page: 1,
        pageSize: newPageSize
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
    ...query,
    setFilters,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    handleSort,
    page,
    pageSize,
    sort,
    order,
    filters
  }
}

export default usePagination
