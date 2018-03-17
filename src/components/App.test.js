import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
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

  component.instance().onWin()

  component.update()

  expect(component.find(GameOver).length).toBe(1)
  expect(component.find(Grid).length).toBe(0)
})

it('passes its win count to its GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ gameOver: true, wins: 12 })

  expect(component.find(GameOver).prop('wins')).toBe(12)
})

it('passes the amount of moves it needed to its GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ gameOver: true, lastMoveCount: 1337 })

  expect(component.find(GameOver).prop('lastMoveCount')).toBe(1337)
})

it('passes the total amount of moves done in the GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ gameOver: true, totalMoveCount: 255 })

  expect(component.find(GameOver).prop('totalMoveCount')).toBe(255)
})

it('sets gameOver to false on restart', () => {
  const component = shallow(<App />)

  component.setState({ gameOver: true })

  component.instance().restart()

  expect(component.state('gameOver')).toBe(false)
})

it('passes its restart to the GameOver component', () => {
  const component = shallow(<App />)

  component.setState({ gameOver: true })

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

  component.instance().onWin(12)

  expect(component.state('lastMoveCount')).toBe(12)

  component.instance().onWin(33)

  expect(component.state('lastMoveCount')).toBe(33)
})

it('increases its totalMoveCount on winning', () => {
  const component = shallow(<App />)

  component.instance().onWin(12)

  expect(component.state('totalMoveCount')).toBe(12)

  component.instance().onWin(33)

  expect(component.state('totalMoveCount')).toBe(45)
})
