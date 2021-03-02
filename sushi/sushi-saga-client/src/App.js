import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import Wallet from './components/Wallet';

// Endpoint!
const API = "http://localhost:3000/sushis"


// set the initial state of sushi
// in CDM we need to fetch
//   - update the state of sushis to the BE data

class App extends Component {
  constructor(){
    super()
    this.state = {
      sushis: [],
      startIndex: 0,
      budget: 30
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/sushis')
    .then(resp => resp.json())
    .then(sushisArr => {
      const updatedSushis = sushisArr.map(sushiObj => {
        return {
          ...sushiObj,
          isEaten: false
        }
      }).slice(0, 10)

      this.setState({
        sushis: updatedSushis
      })
    })
  }

  handleMore = () => {
    let newIndex = this.state.startIndex + 4

    if (newIndex > this.state.sushis.length) {
      newIndex = 0
    }

    this.setState({
      startIndex: newIndex
    })
  }





  handleEaten = (id, price) => {
    if (this.state.budget < price) {
      alert('you dont have money')
      return
    }




    const updatedSushis = this.state.sushis.map(sushiObj => {
      if (sushiObj.id === id) {
        return {
          ...sushiObj,
          isEaten: true
        }
      } else {
        return sushiObj
      }
    })

    this.setState({
      sushis: updatedSushis,
      budget: this.state.budget - price
    })
  }

  handleAdd = (amount) => {
    console.log('-hi-----', amount);
    this.setState({
      budget: this.state.budget + parseInt(amount)
    })

  }

  render() {
    const { sushis, startIndex } =  this.state

    const slicedSushis = sushis.slice(startIndex, startIndex + 4)
    const eatenSushis = sushis.filter(sushi => sushi.isEaten)

    return (
      <div className="app">
        <Wallet handleAdd={this.handleAdd} />
        <SushiContainer 
          handleEaten={this.handleEaten}
          sushis={slicedSushis} 
          handleMore={this.handleMore} />
        <Table budget={this.state.budget} eatenSushis={eatenSushis} />
      </div>
    );
  }
}

export default App;



