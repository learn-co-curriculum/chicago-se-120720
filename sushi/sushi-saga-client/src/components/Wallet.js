import React from 'react'

class Wallet extends React.Component {
  constructor(){
    super()
    this.state = {
      amount: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      amount: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleAdd(this.state.amount)
    this.setState({
      amount: ''
    })
  }

  render(){
    return (
    <form onSubmit={this.handleSubmit}>
      <input type='text' value={this.state.amount} onChange={this.handleChange} />
      <input type='submit' value='add money' />
    </form>
    )
  }
}

export default Wallet
