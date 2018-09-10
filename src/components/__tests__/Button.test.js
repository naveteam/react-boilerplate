import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../Button'

describe('<Button />', () => {
  it('render and generate snapshot', () => {
    const component = renderer.create(<Button disabled />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('testing click', () => {
    /* global jest */
    const handler = jest.fn()
    const button = shallow(<Button onClick={handler} />)
    button.find('button').simulate('click')
    expect(handler.mock.calls.length).toEqual(0)
  })
})
