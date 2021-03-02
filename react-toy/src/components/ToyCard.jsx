import React, { Component } from 'react';

class ToyCard extends Component {

  handleDelete = () => {
    const reqObj = {
      method: 'DELETE',
    }

    
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, reqObj)
    .then(resp => resp.json()) 
    .then(data => {
      this.props.deleteToy(this.props.toy.id)
    })
  }

  handleLike = () => {
    const {likes, id} = this.props.toy


    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    }

    
    fetch(`http://localhost:3000/toys/${id}`, reqObj)
    .then(resp => resp.json()) 
    .then(updatedToy => {
      this.props.updateToy(updatedToy)
    })
  }

  render() {
    const {name, id, image, likes} = this.props.toy
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={this.handleLike}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
