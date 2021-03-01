import React from 'react'
import { Button, Card } from 'semantic-ui-react'

class TodoCard extends React.Component {

 handleRemove = () => {
   const { id } = this.props.todo

   fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' })
   .then(resp => resp.json())
   .then(data => {
     this.props.deleteTodo(id)
   })
 }

  handleComplete = () => {
   const { id } = this.props.todo

    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify({
        completed: true
      })
    }

   fetch(`http://localhost:3000/todos/${id}`, reqObj)
    .then(resp => resp.json())
    .then(updatedTodo=> {
      this.props.updateTodo(updatedTodo)
    })
  }

 render(){
   const { task, completed } = this.props.todo

   return (
   <Card>
      <Card.Content>
        <Card.Header><span className={completed ? 'completed' : ''}>{task}</span></Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red' onClick={this.handleRemove}>
            Delete
          </Button>
          <Button basic color='yellow' onClick={this.handleComplete}>
            Mark As Complete 
          </Button>
        </div>
      </Card.Content>
    </Card>
   )
 }
}

export default TodoCard
