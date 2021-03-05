

import React from 'react';
import { Link } from 'react-router-dom'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      username: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  loginUser = (e) => {
    e.preventDefault()
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(user => {
      this.props.history.push('/paintings')
      // redirect to the paintings path
    })
  }


  render() {
    console.log(this.props)
    return (
      <div className={`app`}>
       <form onSubmit={this.loginUser}>
        <input onChange={this.handleChange} type='text' value={this.state.username} />
        <input type='submit' />
       </form>
       <Link to='/signup' >sign up</Link>
      </div>
    );
  }
}

export default Login;

