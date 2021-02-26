

import React, { Component } from 'react';
import WidgetSelector from './components/WidgetSelector'
import StockTicker from './components/StockTicker'
import DigitalClock from './components/DigitalClock'
import KoalaContainer from './components/KoalaContainer'




class App extends Component {
  constructor(){
    super()
    this.state = {
      showClock: false
    }
  }

  toggleWidget = () => {

    // this.setState((prevState) => {
      // return {
        // showClock: !prevState.showClock
      // }
    // })

    this.setState({
      showClock: !this.state.showClock
    })

  }

  render() {
    return ( 
      <div id='app'>
        <WidgetSelector toggleWidget={this.toggleWidget} />

      </div>
    )
  }
}

export default App;



































/*
class App extends Component {
  constructor(){
    // this is where we initialize our component's state
    super() // this makes sure that constructor gets invoked in the Component class we are inheriting from.

    this.state = {
      koalas: []
    }

    console.log('App', 'Constructor')
  }


  componentDidMount(){
    // is fired off after the first render of a component (i.e after it has been mounted)
    // this is where we want to start prep work for our component

    console.log('App', 'ComponentDidMount')
    fetch('http://localhost:3000/koalas')
    .then(resp => resp.json())
    .then(koalasArr => {
      this.setState({
        koalas: koalasArr
      })
    })


  }


  render() {
    // This is what React decides to add to the dom. The render method has to return valid JSX

    console.log('App Render', this.state)
    return ( 
      <div id='app'>
        <KoalaContainer koalas={this.state.koalas} />
      </div>
    )
  }
}

export default App;
*/
