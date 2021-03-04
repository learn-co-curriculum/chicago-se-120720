
import React from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore } from 'redux'


// Reducer -> will be the function that calculates the state:
//    - receives 2 arguments: the current state, the incoming action 
//    - whatever the reducer returns is the value of our store state
//    - everytime an action is dispatched: the reducer is called:
//          - receives the action that was dispatched
//          - receives the current state












const initialState = {
  count: 9,
  totalClicks: 0
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1,
        totalClicks: state.totalClicks + 1
      }
    case 'SUBTRACT':
      return {
        ...state,
        count: state.count - 1,
        totalClicks: state.totalClicks + 1
      }
    case 'RESET':
      return {
        ...state,
        totalClicks: 0
      }
    case 'RANDOM':
      return {
        ...state,
        count: action.num 
      }
    default:
      return state
  }
}


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Title />
          <Counter />
        </header>
      </div>
    );
  }
}

class Title extends React.Component {
  constructor(){
    super()

    store.subscribe(() => {
      this.forceUpdate()
    })
  }

  reset = () => {
    const action = { type: 'RESET' }
    store.dispatch(action)
  }


  render() {
    return (
      <div>
        <h4> Welcome to Counter:</h4>
        <h4> total click count: { store.getState().totalClicks }</h4>
        <button onClick={this.reset}> reset click count </button>
      </div>
    );
  }
}





class Counter extends React.Component {
  constructor(){
    super()

    store.subscribe(() => {
      this.forceUpdate()
    })
  }



  add = () => {
    const action = {
      type: "ADD"
    }

    store.dispatch(action)
  }

  subtract = () => {
    const action = {
      type: "SUBTRACT"
    }

    store.dispatch(action)
  }

  random = () => {
    const num = Math.floor(Math.random() * 50) + 1
    const action = {
      type: "RANDOM",
      num: num
    }

    store.dispatch(action)
    
  }


  render() {
    return (
      <div>
        <h4>Count: {store.getState().count}</h4>
        <button onClick={this.add}>+</button>
        <button onClick={this.subtract}>-</button>
        <br />
        <button onClick={this.random}>random</button>
      </div>
    );
  }
}

export default App;










// const reducer = (state=initialState, action) => {
  // if (action.type === 'RAIN'){
    // return {
      // weather: 'cloudy'
    // }
  // } else if (action.type === 'HAIL') {
    // return {
      // weather: 'haily
    // }
  // }

  // return state
// }

// const store = createStore(
  // reducer, 
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



// store.dispatch({ type: 'RAIN'})
// store.dispatch({ type: 'HAIL'})
// store.dispatch({ type: 'SNOW'})



