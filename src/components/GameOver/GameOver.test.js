import React from 'react'
import { shallow } from 'enzyme'

import GameOver, { RestartButton } from './GameOver'

it('renders without crashing', () => {
  const component = shallow(<GameOver />)
  expect(component).toBeDefined()
})

it('calls its restart when the button is clicked', () => {
  const props = {
    restart: jest.fn()
  }
  const component = shallow(<GameOver {...props} />)

  component.find(RestartButton).simulate('click')

  expect(props.restart).toBeCalled()
})
