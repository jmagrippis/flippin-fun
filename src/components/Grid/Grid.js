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
    offColor: '#fbb13c',
    targetColor: '#d81159',
    width: 3
  }

  state = {
    tiles: this.getTilesSquare(this.props)
  }

  getRandomColor({ targetColor, offColor }) {
    return Math.random() >= 0.5 ? targetColor : offColor
  }

  getOtherColor(currentColor, { targetColor, offColor }) {
    return currentColor === targetColor ? offColor : targetColor
  }

  getTilesSquare({ width, ...restProps }) {
    return [...Array(width ** 2)].map(() => this.getRandomColor(restProps))
  }

  componentWillReceiveProps(nextProps) {
    const { width } = this.props
    if (width !== nextProps.width) {
      this.setState({
        tiles: this.getTilesSquare(nextProps)
      })
    }
  }

  componentDidUpdate() {
    const { onWin, targetColor } = this.props
    const { tiles } = this.state
    if (onWin && tiles.every(color => color === targetColor)) {
      onWin()
    }
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

  getNextTiles(tiles, sourceIndex, colors) {
    const row = this.getRow(sourceIndex, tiles)
    const column = this.getColumn(sourceIndex, tiles)

    const source = { row, column, i: sourceIndex }
    return tiles.map(
      (color, i) =>
        this.shouldChangeColor(i, source, tiles)
          ? this.getOtherColor(color, colors)
          : color
    )
  }

  onTileClick = i => {
    this.setState(({ tiles }) => ({
      tiles: this.getNextTiles(tiles, i, this.props)
    }))
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
