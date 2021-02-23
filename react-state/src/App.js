import React from 'react'
import logo from './logo.svg';
import './App.css';
import TodoContainer from './TodoContainer'
import Form from './Form'


const todosArr = [
  { id: 1, task: 'clean room'},
  { id: 2, task: 'wash dishes'}
]



class App extends React.Component{
  constructor(){
    super()
    this.state = {
      todos: todosArr
    }
  }

  handleReset = () => {
    this.setState({
      todos: []
    })
  }

  deleteTodo = (id) => {
    const updatedTodos = this.state.todos.filter( todoObj => id !== todoObj.id )

    this.setState({
      todos: updatedTodos
    })

  }

  addTodo= (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }

  render(){
    const trimmedTodos = this.state.todos.slice(0, 5)
    const colors = {}

    return (
      <div className="App">
        <header className="App-header">
          <Form addTodo={this.addTodo} />
          <button onClick={this.handleReset}>Reset Todos</button>
          <TodoContainer todos={trimmedTodos} deleteTodo={this.deleteTodo} />
        </header>
      </div>
    );
  }
}

export default App;


