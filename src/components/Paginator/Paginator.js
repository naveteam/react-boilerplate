import React, { Fragment, memo, useMemo } from 'react'
import { func, number } from 'prop-types'

import styled, { css } from 'styled-components'

import Button from 'components/Button'
import Row from 'components/Row'

const Paginator = ({ currentPage, onChangePage, total, ...props }) => {
  const onPreviousPage = () => {
    onChangePage(Math.max(currentPage - 1, 1))
  }

  const onNextPage = () => {
    onChangePage(Math.min(currentPage + 1, total))
  }

  const pages = useMemo(() => Array.from(Array(total)).map((_, index) => index + 1), [total])

  const IS_FIRST_PAGE = currentPage === 1
  const IS_LAST_PAGE = currentPage === total

  const SHOULD_SHOW_ELLIPSIS = total > 7

  const SHOULD_SHOW_START_ELLIPSIS = currentPage >= 5
  const SHOULD_SHOW_END_ELLIPSIS = total - 3 > currentPage

  const middle = useMemo(() => {
    if (!SHOULD_SHOW_START_ELLIPSIS) {
      return [1, 5]
    }

    if (!SHOULD_SHOW_END_ELLIPSIS) {
      return [total - 5, -1]
    }

    return [currentPage - 2, currentPage + 1]
  }, [SHOULD_SHOW_END_ELLIPSIS, SHOULD_SHOW_START_ELLIPSIS, currentPage, total])

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

          <PageButton onClick={() => onChangePage(total)} isActive={currentPage === total} ml={8}>
            {total}
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
  total: number
}

export default memo(Paginator)
