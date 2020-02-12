import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../Button'

describe('<Button />', () => {
  it('render and generate snapshot', () => {
    const component = renderer.create(<Button disabled />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
