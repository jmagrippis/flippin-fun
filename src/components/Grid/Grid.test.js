import React from 'react'
import { shallow } from 'enzyme'

import Grid from './Grid'
import Tile from './Tile/Tile'

it('renders without crashing', () => {
  const component = shallow(<Grid />)
  expect(component).toBeDefined()
})

it('renders 9 tiles when given a width', () => {
  const component = shallow(<Grid width={3} />)
  expect(component.find(Tile).length).toBe(9)
})

it('has a number of Tiles according to its width', () => {
  const component = shallow(<Grid width={2} />)
  expect(component.find(Tile).length).toBe(4)
})

it('passes Tiles their index', () => {
  const component = shallow(<Grid width={2} />)
  component.find(Tile).forEach((tile, i) => {
    expect(tile.prop('index')).toBe(i)
  })
})

it('passes Tiles its own onClick', () => {
  const component = shallow(<Grid width={2} />)
  const onTileClick = component.instance().onTileClick

  component.find(Tile).forEach((tile, i) => {
    expect(tile.prop('onClick')).toBe(onTileClick)
  })
})

it('renders as many tiles as it has in its state', () => {
  const component = shallow(<Grid width={3} />)

  component.setState({ tiles: ['red'] })

  expect(component.find(Tile).length).toBe(1)
})

it('recalculates its tiles if it receives a different width', () => {
  const component = shallow(<Grid width={3} />)

  component.setProps({ width: 2 })

  expect(component.find(Tile).length).toBe(4)
})

it('gives tiles color according to its state', () => {
  const component = shallow(<Grid />)

  const tiles = ['red', 'green', '#000000']
  component.setState({ tiles })

  component.find(Tile).forEach((tile, i) => {
    expect(tile.prop('color')).toBe(tiles[i])
  })
})

it('gives tiles one of its given colors', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red'
  }

  const colors = [props.offColor, props.targetColor]

  const component = shallow(<Grid {...props} />)

  component.find(Tile).forEach(tile => {
    expect(colors).toContain(tile.prop('color'))
  })
})

it('changes the color of the clicked tile', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  const color = component
    .find(Tile)
    .first()
    .prop('color')

  component.instance().onTileClick(0)

  component.update()

  const nextColor = component
    .find(Tile)
    .first()
    .prop('color')

  expect(nextColor).not.toBe(color)
})

it('changes the color of the clicked tile to a valid color', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const colors = [props.offColor, props.targetColor]

  const component = shallow(<Grid {...props} />)

  component.instance().onTileClick(0)

  component.update()

  const color = component
    .find(Tile)
    .first()
    .prop('color')

  expect(colors).toContain(color)
})

it('calls its `onWin` if every tile is the target color', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2,
    onWin: jest.fn()
  }

  const component = shallow(<Grid {...props} />)

  const tiles = ['red', 'red', 'red', 'red']

  component.setState({ tiles })

  expect(props.onWin).toBeCalled()
})
