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
    if (tiles.every(color => color === targetColor)) {
      onWin()
    }
  }

  onTileClick = i => {
    this.setState(({ tiles }) => ({
      tiles: [
        ...tiles.slice(0, i),
        this.getOtherColor(tiles[i], this.props),
        ...tiles.slice(i + 1)
      ]
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
