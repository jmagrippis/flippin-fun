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

it('calls the given `onWin` if every tile is the target color', () => {
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

it('changes the color of the tile after the clicked one', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  const color = component
    .find(Tile)
    .at(1)
    .prop('color')

  component.instance().onTileClick(0)

  component.update()

  const nextColor = component
    .find(Tile)
    .at(1)
    .prop('color')

  expect(nextColor).not.toBe(color)
})

it('does not add more tiles when clicking the last one', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  const tilesCount = component.find(Tile).length

  component.instance().onTileClick(3)

  component.update()

  const nextTilesCount = component.find(Tile).length

  expect(nextTilesCount).toBe(tilesCount)
})

it('does not change the color of the tile after the clicked one, when the clicked one is on the right edge of the grid', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  const color = component
    .find(Tile)
    .at(2)
    .prop('color')

  component.instance().onTileClick(1)

  component.update()

  const nextColor = component
    .find(Tile)
    .at(2)
    .prop('color')

  expect(nextColor).toBe(color)
})

it('changes the color of the tile before the clicked one', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  const color = component
    .find(Tile)
    .at(0)
    .prop('color')

  component.instance().onTileClick(1)

  component.update()

  const nextColor = component
    .find(Tile)
    .at(0)
    .prop('color')

  expect(nextColor).not.toBe(color)
})

it('does not change the color of the tile before the clicked one, when the clicked one is on the left edge of the grid', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  const color = component
    .find(Tile)
    .at(1)
    .prop('color')

  component.instance().onTileClick(2)

  component.update()

  const nextColor = component
    .find(Tile)
    .at(1)
    .prop('color')

  expect(nextColor).toBe(color)
})

it('changes the color of the tile below the clicked one', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  const color = component
    .find(Tile)
    .at(2)
    .prop('color')

  component.instance().onTileClick(0)

  component.update()

  const nextColor = component
    .find(Tile)
    .at(2)
    .prop('color')

  expect(nextColor).not.toBe(color)
})

it('does not change the color of the tile below the clicked one, if it is more than one space away', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 3
  }

  const component = shallow(<Grid {...props} />)

  const color = component
    .find(Tile)
    .at(6)
    .prop('color')

  component.instance().onTileClick(0)

  component.update()

  const nextColor = component
    .find(Tile)
    .at(6)
    .prop('color')

  expect(nextColor).toBe(color)
})

it('does not change the color of a tile on the right of the clicked one, if it is more than one space away', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 3
  }

  const component = shallow(<Grid {...props} />)

  const color = component
    .find(Tile)
    .at(2)
    .prop('color')

  component.instance().onTileClick(0)

  component.update()

  const nextColor = component
    .find(Tile)
    .at(2)
    .prop('color')

  expect(nextColor).toBe(color)
})

it('keeps a count of the moves', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  expect(component.state('moveCount')).toBe(0)
})

it('increases the move count for every click', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2
  }

  const component = shallow(<Grid {...props} />)

  component.instance().onTileClick(0)

  expect(component.state('moveCount')).toBe(1)

  component.instance().onTileClick(5)
  component.instance().onTileClick(5)

  expect(component.state('moveCount')).toBe(3)
})

it('calls the given `onWin` with its move count', () => {
  const props = {
    offColor: 'green',
    targetColor: 'red',
    width: 2,
    onWin: jest.fn()
  }

  const component = shallow(<Grid {...props} />)

  const tiles = ['red', 'red', 'red', 'red']
  const moveCount = 42

  component.setState({ tiles, moveCount })

  expect(props.onWin).toBeCalledWith(moveCount)
})
