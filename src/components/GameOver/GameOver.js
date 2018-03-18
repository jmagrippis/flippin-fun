import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: #ffffff;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

export const RestartButton = styled.button`
  font-size: 34px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
  line-height: 150%;
  cursor: pointer;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.4);
  }
`

const tableFlip = '(ﾉ´･ω･)ﾉ ﾐ ┸━┸'

class GameOver extends PureComponent {
  render() {
    const {
      lastMoveCount,
      restart,
      wins,
      backgroundColor,
      accentColor
    } = this.props
    return (
      <Container backgroundColor={backgroundColor}>
        <div>You won!</div>
        <div>
          You needed {lastMoveCount} move{lastMoveCount === 1 ? '' : 's'}.
        </div>
        <div>
          {wins === 1 ? 'It was your first win!' : `This was win #${wins}!`}
        </div>
        <RestartButton backgroundColor={accentColor} onClick={restart}>
          <div>Play again!</div>
          <div>{tableFlip}</div>
        </RestartButton>
      </Container>
    )
  }
}

export default GameOver
