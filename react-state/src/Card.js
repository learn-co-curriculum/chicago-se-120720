import React from 'react'

class Card extends React.Component {

  handleClick = () => {
    const { deleteTodo, id } = this.props

    deleteTodo(id)
  }


 render(){
   return (
     <div>
       <h4>{this.props.task}<button onClick={this.handleClick}>remove task</button></h4>
     </div>
   )
 }
}

export default Card

