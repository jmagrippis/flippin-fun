import React from 'react'
import { shallow } from 'enzyme'

import Grid from './Grid'
import Tile from './Tile/Tile'

it('renders without crashing', () => {
  const component = shallow(<Grid />)
  expect(component).toBeDefined()
})

it('renders 9 blocks when given a width ', () => {
  const component = shallow(<Grid width={3} />)
  expect(component.find(Tile).length).toBe(9)
})

it('has a number of Tiles according to its width', () => {
  const component = shallow(<Grid width={2} />)
  expect(component.find(Tile).length).toBe(4)
})
