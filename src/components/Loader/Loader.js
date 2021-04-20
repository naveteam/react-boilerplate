import React from 'react'
import styled, { keyframes } from 'styled-components'

import Row from 'components/Row'

const LoaderComponent = props => (
  <Row justifyContent='center' {...props}>
    <Loader />
  </Row>
)
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-left: 4px solid #6721ca;
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

export default LoaderComponent
