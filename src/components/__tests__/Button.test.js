import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../Button'

describe('<Button />', () => {
  it('renders a button element', () => {
    const component = renderer.create(<Button />)
    const tree = component.toJSON()
  })
})
