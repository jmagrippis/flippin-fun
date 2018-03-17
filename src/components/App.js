import React, { PureComponent } from 'react'

import Grid from './Grid/Grid'

class App extends PureComponent {
  state = { wins: 0 }

  onWin = () => {
    this.setState(({ wins }) => {
      const nextWins = wins + 1
      console.log(`That was win #${nextWins}!`)
      return { wins: nextWins }
    })
  }

  render() {
    return <Grid onWin={this.onWin} />
  }
}

export default App
