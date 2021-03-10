
import React from 'react';
import { connect } from 'react-redux'
import { loginSuccess } from '../actions/index'


class Login extends React.Component {
  state = {
    username: 'raza',
    password: 'hello',
    error: ''
  }

  handleInputChange = (e) => { 
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(this.state)
    }

    fetch('http://localhost:3000/api/v1/auth', reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data, '-----logged in-');

      if (data.error) {
        this.setState({
          error: data.error
        })
      } else {
        this.props.loginSuccess(data)
        this.setState({
          username: '',
          password: ''
        })
        
        this.props.history.push('/dashboard')
      }


      // successful login
      //   - save to the store
      //   - clear the form
      //   - redirect to the dashboard
      //
      // else failure:
      //   - render some info that it failed
    })
  }

  render(){
    return (
      <div>
        <h3>Sign in</h3>
        { this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
        <form onSubmit={this.handleSubmit}>
          <input name={'username'} onChange={this.handleInputChange} value={this.state.username} />
          <input name={'password'} onChange={this.handleInputChange} value={this.state.password} />
          <input type='submit' value='login' />
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = {
  loginSuccess: loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)





