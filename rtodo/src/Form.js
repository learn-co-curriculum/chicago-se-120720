import React from 'react'

class Form extends React.Component {
  constructor(){
    super()
    this.state = {
      task: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      task: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const newTodo = {
      ...this.state,
      completed: false
    }

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(newTodo)
    }

    fetch('http://localhost:3000/todos', reqObj)
    .then(resp => resp.json())
    .then(newTodo => {
      this.props.createTodo(newTodo)
    })
    
  }

 render(){
   return (
   <form className={'form'} onSubmit={this.handleSubmit}>
     <input type='text' value={this.state.task} onChange={this.handleChange} />
     <input type='submit' value='add todo '/>
   </form>
   )
 }
}

export default Form
