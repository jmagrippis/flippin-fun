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
