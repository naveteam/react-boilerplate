import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Button from 'components/Button'

describe('<Button />', () => {
  it('render and generate snapshot', () => {
    const component = renderer.create(<Button disabled />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
