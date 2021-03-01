
 import React from 'react'
 
 class Filter extends React.Component {
 
  render(){
    return (
    <div className='form'>
      <button onClick={this.props.toggleCompleted} >
      { this.props.showCompleted ? 'Show All' : 'Show Completed'}
      </button>
    </div>
    )
  }
 }

 export default Filter
