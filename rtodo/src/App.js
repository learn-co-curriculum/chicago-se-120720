import React from 'react'
import logo from './logo.svg';
import './App.css';
import TodoContainer from './TodoContainer'
import Form from './Form'
import Filter from './Filter'
import 'semantic-ui-css/semantic.min.css'

class App extends  React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],
      showCompleted: false
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/todos')
    .then(resp => resp.json())
    .then(todosArr => {
      this.setState({
        todos: todosArr
      })
    })
  }

  toggleCompleted = () => {
    this.setState({
      showCompleted: !this.state.showCompleted
    })
  }

  deleteTodo = (id) => {
    const updatedTodos = this.state.todos.filter( todo => todo.id !== id )

    this.setState({
      todos: updatedTodos
    })
  }

  updateTodo = (updatedTodo) => {
    console.log(updatedTodo, '------');
    const updatedTodos = this.state.todos.map(t => {
      if (t.id === updatedTodo.id) {
        return updatedTodo
      } else {
        return t
      }
    })


    this.setState({
      todos: updatedTodos
    })


  }

  createTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }

  findTodos = () => {
    if (this.state.showCompleted) {
      return this.state.todos.filter(t => t.completed )
    } else {
      return this.state.todos
    }
  }


  render(){
    const todosToShow = this.findTodos()

    return (
      <div className="App">
        <header className="App-header">
          <Filter toggleCompleted={this.toggleCompleted} showCompleted={this.state.showCompleted} />
          <Form createTodo={this.createTodo} />
          <TodoContainer updateTodo={this.updateTodo} todos={todosToShow} deleteTodo={this.deleteTodo} />
        </header>
      </div>
    );
  }
}

export default App;
