import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  background-color: #d81159;
  color: #ffffff;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

export const RestartButton = styled.button`
  background-color: #fbb13c;
  font-size: 34px;
`

const tableFlip = '(ﾉ´･ω･)ﾉ ﾐ ┸━┸'

class GameOver extends PureComponent {
  render() {
    const { lastMoveCount, restart, wins } = this.props
    return (
      <Container>
        <div>You won!</div>
        <div>
          You needed {lastMoveCount} move{lastMoveCount === 1 ? '' : 's'}.
        </div>
        <div>
          {wins === 1 ? 'It was your first win!' : `This was win #${wins}!`}
        </div>
        <RestartButton onClick={restart}>
          <div>Play again!</div>
          <div>{tableFlip}</div>
        </RestartButton>
      </Container>
    )
  }
}

export default GameOver
