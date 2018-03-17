import React from 'react'
import { shallow } from 'enzyme'

import Tile from './Tile'

it('renders without crashing', () => {
  const component = shallow(<Tile />)
  expect(component).toBeDefined()
})

it('passes its given color as the backgroundColor', () => {
  const component = shallow(<Tile color="#000000" />)
  expect(component.prop('backgroundColor')).toBe('#000000')

  component.setProps({ color: 'red' })
  expect(component.prop('backgroundColor')).toBe('red')
})

it('calls its given on click, when you click it!', () => {
  const props = {
    onClick: jest.fn()
  }

  const component = shallow(<Tile {...props} />)
  component.simulate('click')

  expect(props.onClick).toBeCalled()
})

it('calls its given on click, with its given index', () => {
  const props = {
    onClick: jest.fn(),
    index: 3
  }

  const component = shallow(<Tile {...props} />)
  component.simulate('click')

  expect(props.onClick).toBeCalledWith(3)
})
