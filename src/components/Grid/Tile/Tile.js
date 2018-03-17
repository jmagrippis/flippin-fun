import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
`

class Tile extends PureComponent {
  render() {
    const { color } = this.props
    return <Container backgroundColor={color} />
  }
}

export default Tile
