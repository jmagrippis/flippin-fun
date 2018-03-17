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
  static defaultProps = { width: 3 }

  render() {
    const { width } = this.props
    return (
      <Container width={width}>
        {[...Array(width ** 2)].map((v, i) => <Tile key={i} color="#d81159" />)}
      </Container>
    )
  }
}

export default Grid
