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

it('passes its background color to the container', () => {
  const component = shallow(<GameOver backgroundColor="purple" />)

  expect(component.prop('backgroundColor')).toBe('purple')
})

it('passes its accent color to the button', () => {
  const component = shallow(<GameOver accentColor="green" />)

  expect(component.find(RestartButton).prop('backgroundColor')).toBe('green')
})
