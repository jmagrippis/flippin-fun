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
    colors: ['#fbb13c', '#d81159'],
    width: 3
  }

  state = {
    tiles: this.getTilesSquare(this.props.width, this.props.colors)
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  getTilesSquare(size, colors) {
    return [...Array(size ** 2)].map(() => this.getRandomElement(colors))
  }

  onTileClick = () => {}

  componentWillReceiveProps(nextProps) {
    const { width } = this.props
    if (width !== nextProps.width) {
      this.setState({
        tiles: this.getTilesSquare(nextProps.width, nextProps.colors)
      })
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
