import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{
  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      this.setState({
        toys: toys
      })
    })
  }

  handleClick = () => {
    const newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = (newToy) => {
    this.setState({
      toys: [...this.state.toys, newToy]
    })
  }

  updateToy= (updatedToy) => {
    const updatedToys = this.state.toys.map(toyObj => {
      if (toyObj.id === updatedToy.id) {
        return updatedToy
      } else {
        return toyObj
      }
    })

    this.setState({
      toys: updatedToys
    })
  }

  deleteToy = (id) => {
    const updatedToys = this.state.toys.filter(t => t.id !== id )

    this.setState({
      toys: updatedToys
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display ? <ToyForm addToy={this.addToy} /> : null }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} updateToy={this.updateToy} deleteToy={this.deleteToy} />
      </>
    );
  }

}

export default App;
