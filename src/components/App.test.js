import React from 'react'
import { shallow } from 'enzyme'

import App, { getOtherColor } from './App'
import Grid from './Grid/Grid'
import GameOver from './GameOver/GameOver'

it('renders without crashing', () => {
  const component = shallow(<App />)

  expect(component).toBeDefined()
})

it('shows a Grid component to start with', () => {
  const component = shallow(<App />)

  expect(component.find(Grid).length).toBe(1)
})

it('shows the GameOver component instead upon winning', () => {
  const component = shallow(<App />)

  component.instance().onWin('purple')

  component.update()

  expect(component.find(GameOver).length).toBe(1)
  expect(component.find(Grid).length).toBe(0)
})

it('passes its win count to its GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ winningColor: 'purple', wins: 12 })

  expect(component.find(GameOver).prop('wins')).toBe(12)
})

it('passes the amount of moves it needed to its GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ winningColor: 'purple', lastMoveCount: 1337 })

  expect(component.find(GameOver).prop('lastMoveCount')).toBe(1337)
})

it('passes the total amount of moves done to its GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ winningColor: 'purple', totalMoveCount: 255 })

  expect(component.find(GameOver).prop('totalMoveCount')).toBe(255)
})

it('passes the winning color to its GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ winningColor: 'purple', totalMoveCount: 255 })

  expect(component.find(GameOver).prop('totalMoveCount')).toBe(255)
})

it('sets winning color to the empty string on restart', () => {
  const component = shallow(<App />)

  component.setState({ winningColor: 'purple' })

  component.instance().restart()

  expect(component.state('winningColor')).toBe('')
})

it('passes its restart to the GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ winningColor: 'purple' })

  const restart = component.instance().restart

  expect(component.find(GameOver).prop('restart')).toBe(restart)
})

it('increments its wins upon winning', () => {
  const component = shallow(<App />)

  component.instance().onWin()

  expect(component.state('wins')).toBe(1)

  component.instance().onWin()
  component.instance().onWin()
  component.instance().onWin()

  expect(component.state('wins')).toBe(4)
})

it('updates its lastMoveCount on winning', () => {
  const component = shallow(<App />)

  component.instance().onWin('purple', 12)

  expect(component.state('lastMoveCount')).toBe(12)

  component.instance().onWin('purple', 33)

  expect(component.state('lastMoveCount')).toBe(33)
})

it('increases its totalMoveCount on winning', () => {
  const component = shallow(<App />)

  component.instance().onWin('purple', 12)

  expect(component.state('totalMoveCount')).toBe(12)

  component.instance().onWin('purple', 33)

  expect(component.state('totalMoveCount')).toBe(45)
})

describe('getOtherColor', () => {
  it('returns the first color of the given array', () => {
    expect(getOtherColor('red', ['purple', 'red'])).toBe('purple')
  })

  it('returns the second color of the given array', () => {
    expect(getOtherColor('purple', ['purple', 'red'])).toBe('red')
  })
})
