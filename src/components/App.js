import React, { PureComponent } from 'react'

import Grid from './Grid/Grid'
import GameOver from './GameOver/GameOver'

class App extends PureComponent {
  state = {
    gameOver: false,
    wins: 0,
    totalMoveCount: 0
  }

  onWin = lastMoveCount => {
    this.setState(({ wins, totalMoveCount }) => ({
      lastMoveCount,
      totalMoveCount: totalMoveCount + lastMoveCount,
      wins: wins + 1,
      gameOver: true
    }))
  }

  restart = () => {
    this.setState({ gameOver: false })
  }

  render() {
    const { gameOver, lastMoveCount, totalMoveCount, wins } = this.state

    return gameOver ? (
      <GameOver
        lastMoveCount={lastMoveCount}
        totalMoveCount={totalMoveCount}
        wins={wins}
        restart={this.restart}
      />
    ) : (
      <Grid onWin={this.onWin} />
    )
  }
}

export default App
