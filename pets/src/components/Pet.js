import React from 'react'

class Pet extends React.Component {


  handleAdopt = () => {
    const { onAdoptPet, pet: { id } } = this.props

    onAdoptPet(id)
  }

  render() {
    const { id, name, gender, type, age, weight, isAdopted } = this.props.pet


    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {/*'♀' OR '♂' */}
            { gender ==='female' ? '♀' : '♂' }
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age} </p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <div className="extra content">
      {
        isAdopted ? 
        <button className="ui disabled button">Already adopted</button>
        :
        <button className="ui primary button" onClick={ this.handleAdopt } >Adopt pet</button>
      }
        </div>
      </div>
    )
  }
}

// another way to write the click handler
// <button className="ui primary button" onClick={ () => this.props.onAdoptPet(id) } >Adopt pet</button>

export default Pet



