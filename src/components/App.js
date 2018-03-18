import React, { PureComponent } from 'react'

import Grid from './Grid/Grid'
import GameOver from './GameOver/GameOver'

const RUBY = '#d81159'
const YELLOW_ORANGE = '#fbb13c'

export function getOtherColor(currentColor, [a, b]) {
  return currentColor === a ? b : a
}

class App extends PureComponent {
  state = {
    winningColor: '',
    wins: 0,
    totalMoveCount: 0
  }

  static colors = [RUBY, YELLOW_ORANGE]

  onWin = (winningColor, lastMoveCount) => {
    this.setState(({ wins, totalMoveCount }) => ({
      winningColor,
      lastMoveCount,
      totalMoveCount: totalMoveCount + lastMoveCount,
      wins: wins + 1
    }))
  }

  restart = () => {
    this.setState({ winningColor: '' })
  }

  render() {
    const { lastMoveCount, totalMoveCount, wins, winningColor } = this.state

    return winningColor ? (
      <GameOver
        lastMoveCount={lastMoveCount}
        totalMoveCount={totalMoveCount}
        wins={wins}
        backgroundColor={winningColor}
        accentColor={getOtherColor(winningColor, App.colors)}
        restart={this.restart}
      />
    ) : (
      <Grid onWin={this.onWin} colors={App.colors} />
    )
  }
}

export default App
