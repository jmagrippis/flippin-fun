import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
`

class Tile extends PureComponent {
  onClick = () => {
    const { index, onClick } = this.props
    onClick(index)
  }

  render() {
    const { color } = this.props
    return <Container backgroundColor={color} onClick={this.onClick} />
  }
}

export default Tile
