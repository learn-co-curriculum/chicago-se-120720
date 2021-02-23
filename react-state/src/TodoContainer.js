

import React from 'react'
import Card from './Card'


class TodoContainer extends React.Component {


  renderTodos = () => {
    return this.props.todos.map(todoObj => {
      return <Card key={todoObj.id} id={todoObj.id} task={todoObj.task} deleteTodo={this.props.deleteTodo} />
    })
  }

  render(){
    return <div>
      {this.renderTodos()}
    </div>
  }
}



export default TodoContainer
