

import React from 'react'
import Card from './Card'


class TodoContainer extends React.Component {
  renderTodos = () => {
    return this.props.todos.map(todoObj => {
      return <Card key={todoObj.id} updateTodo={this.props.updateTodo} todo={todoObj} deleteTodo={this.props.deleteTodo} />
    })
  }

  render(){
    return (
      <div>
        {this.renderTodos()}
      </div>
    )
  }
}

export default TodoContainer
