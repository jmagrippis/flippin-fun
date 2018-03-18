import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Tile from './Tile/Tile'

const Container = styled.div`
  flex: 1;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
`

class Grid extends PureComponent {
  static defaultProps = {
    colors: ['#d81159', '#fbb13c'],
    width: 3
  }

  state = {
    tiles: Grid.getTilesSquare(this.props),
    moveCount: 0
  }

  static getRandomColor([a, b]) {
    return Math.random() >= 0.5 ? a : b
  }

  static getTilesSquare({ width, colors }) {
    const length = width ** 2
    let allTheSameColor = true
    let lastColor

    return [...Array(length)].map((v, i) => {
      const color = Grid.getRandomColor(colors)

      if (i === length - 1 && allTheSameColor) {
        return Grid.getOtherColor(lastColor, colors)
      }

      if (lastColor && lastColor !== color) {
        allTheSameColor = false
      }

      lastColor = color

      return color
    })
  }

  static getOtherColor(currentColor, [a, b]) {
    return currentColor === a ? b : a
  }

  static areAllSameColor(tiles) {
    let prevColor
    return tiles.every(color => {
      let same = color === prevColor
      if (!prevColor) {
        same = true
      }

      prevColor = color
      return same
    })
  }

  getRow(i, tiles) {
    return ~~(i / Math.sqrt(tiles.length))
  }

  isOnRow(i, row, tiles) {
    return this.getRow(i, tiles) === row
  }

  getColumn(i, tiles) {
    return i % Math.sqrt(tiles.length)
  }

  isOnColumn(i, column, tiles) {
    return this.getColumn(i, tiles) === column
  }

  isInRange(i, { row, column }, tiles) {
    return (
      Math.abs(this.getColumn(i, tiles) - column) <= 1 &&
      Math.abs(this.getRow(i, tiles) - row) <= 1
    )
  }

  shouldChangeColor(i, source, tiles) {
    const { i: sourceIndex, row, column } = source

    if (i === sourceIndex) return true

    return (
      this.isInRange(i, source, tiles) &&
      (this.isOnRow(i, row, tiles) || this.isOnColumn(i, column, tiles))
    )
  }

  getNextTiles(tiles, sourceIndex, { colors }) {
    const row = this.getRow(sourceIndex, tiles)
    const column = this.getColumn(sourceIndex, tiles)

    const source = { row, column, i: sourceIndex }
    return tiles.map(
      (color, i) =>
        this.shouldChangeColor(i, source, tiles)
          ? Grid.getOtherColor(color, colors)
          : color
    )
  }

  onTileClick = i => {
    this.setState(({ moveCount, tiles }) => ({
      tiles: this.getNextTiles(tiles, i, this.props),
      moveCount: moveCount + 1
    }))
  }

  componentWillReceiveProps(nextProps) {
    const { width } = this.props
    if (width !== nextProps.width) {
      this.setState({
        tiles: Grid.getTilesSquare(nextProps)
      })
    }
  }

  componentDidUpdate() {
    const { onWin } = this.props
    const { tiles, moveCount } = this.state

    if (onWin && Grid.areAllSameColor(tiles)) {
      onWin(moveCount)
    }
  }

  render() {
    const { tiles } = this.state

    return (
      <Container width={~~Math.sqrt(tiles.length)}>
        {tiles.map((color, i) => (
          <Tile key={i} index={i} color={color} onClick={this.onTileClick} />
        ))}
      </Container>
    )
  }
}

export default Grid
