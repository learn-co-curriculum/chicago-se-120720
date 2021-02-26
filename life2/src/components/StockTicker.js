import React, { Component } from 'react'





// Class Component vs Functional Component
// Container Components vs Presentational Components

// Function components:
// 1. lack internal state
// 2. lack lifecycle methods










class StockTicker extends Component {
  constructor(){
    super()

    const ticker = Math.floor(Math.random() * 100) + 1


    this.state = {
      ticker: ticker,
      isGreen: true
    }
  }

  componentDidMount(){
    this.intervalId = setInterval(() => {
      const ticker = Math.floor(Math.random() * 100) + 1
      this.setState({
        ticker: ticker
      })
    }, 1500)
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }


  // use ComponentDidUpdate if you need to compare the previous value of state or props with the current value of state or propsp
  // in order to potentially make more changes




  componentDidUpdate(prevProps, prevState){
    if(this.state.ticker > prevState.ticker){
      this.setState({
        isGreen: true
      })
    } else if (this.state.ticker < prevState.ticker) {
      this.setState({
        isGreen: false
      })
    }
  }


  render() {


    const tickerStyles = this.state.isGreen ? { color: 'green' } : { color: 'red' }


    return (
      <div className="app-children">
        <div id="ticker">
          <h2>Flatiron</h2>
          <div style={tickerStyles}>
            {this.state.ticker}
          </div>
        </div>
      </div>
    )
  }
}

export default StockTicker



















