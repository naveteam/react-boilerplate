import React from 'react'
import { func, number } from 'prop-types'

const Paginator = ({ onNextPage, onPreviousPage, page }) => (
  <section>
    <button onClick={onPreviousPage}>prev</button>
    <span>{page}</span>
    <button onClick={onNextPage}>next</button>
  </section>
)

Paginator.propTypes = {
  onNextPage: func,
  onPreviousPage: func,
  page: number
}

export default Paginator
