import React, { Fragment, memo, useMemo } from 'react'
import { func, number } from 'prop-types'

import styled, { css } from 'styled-components'

import Button from 'components/Button'
import Row from 'components/Row'

const Paginator = ({ currentPage, onChangePage, pageCount, ...props }) => {
  const onPreviousPage = () => {
    onChangePage(Math.max(currentPage - 1, 1))
  }

  const onNextPage = () => {
    onChangePage(Math.min(currentPage + 1, pageCount))
  }

  const pages = useMemo(() => Array.from(Array(pageCount)).map((_, index) => index + 1), [pageCount])

  const IS_FIRST_PAGE = currentPage === 1
  const IS_LAST_PAGE = currentPage >= pageCount

  const SHOULD_SHOW_ELLIPSIS = pageCount > 7

  const SHOULD_SHOW_START_ELLIPSIS = currentPage >= 5
  const SHOULD_SHOW_END_ELLIPSIS = pageCount - 3 > currentPage

  const middle = useMemo(() => {
    if (!SHOULD_SHOW_START_ELLIPSIS) {
      return [1, 5]
    }

    if (!SHOULD_SHOW_END_ELLIPSIS) {
      return [pageCount - 5, -1]
    }

    return [currentPage - 2, currentPage + 1]
  }, [SHOULD_SHOW_END_ELLIPSIS, SHOULD_SHOW_START_ELLIPSIS, currentPage, pageCount])

  return (
    <Row alignItems='center' {...props}>
      <HandlerButton onClick={onPreviousPage} disabled={IS_FIRST_PAGE} mr={16}>
        Anterior
      </HandlerButton>
      {SHOULD_SHOW_ELLIPSIS ? (
        <Fragment>
          <PageButton onClick={() => onChangePage(1)} isActive={currentPage === 1}>
            1
          </PageButton>

          {SHOULD_SHOW_START_ELLIPSIS && <Ellipsis />}

          {[...pages].slice(...middle).map(page => (
            <PageButton key={page} onClick={() => onChangePage(page)} isActive={currentPage === page} ml={8}>
              {page}
            </PageButton>
          ))}

          {SHOULD_SHOW_END_ELLIPSIS && <Ellipsis />}

          <PageButton onClick={() => onChangePage(pageCount)} isActive={currentPage === pageCount} ml={8}>
            {pageCount}
          </PageButton>
        </Fragment>
      ) : (
        pages.map(page => (
          <PageButton key={page} onClick={() => onChangePage(page)} isActive={currentPage === page} ml={8}>
            {page}
          </PageButton>
        ))
      )}
      <HandlerButton onClick={onNextPage} disabled={IS_LAST_PAGE} ml={16}>
        Próximo
      </HandlerButton>
    </Row>
  )
}

const Ellipsis = styled.button.attrs({
  children: '...'
})`
  background-color: transparent;
  border-radius: 4px;
  cursor: default;
  height: 24px;
  margin-left: 8px;
  width: 24px;
`

const HandlerButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary.main};
  width: auto;

  transition: color 200ms;

  :disabled {
    color: #ddd;
  }
`

const PageButton = styled(Button)`
  ${({ isActive, theme }) =>
    css`
      background-color: transparent;
      color: #757575;
      height: 24px;
      width: auto;
      min-width: 24px;

      transition: background-color 200ms, color 200ms;

      ${isActive &&
      css`
        background-color: ${theme.colors.primary.main};
        color: #fff;
      `}
      :hover {
        background-color: ${theme.colors.primary.main};
        color: #fff;
      }
    `}
`

Paginator.propTypes = {
  currentPage: number,
  onChangePage: func,
  pageCount: number
}

export default memo(Paginator)
