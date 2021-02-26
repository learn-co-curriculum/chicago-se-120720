import React, { Component } from 'react'
import KoalaCard from './KoalaCard'

class KoalaContainer extends Component {
  render () {
    console.log('KoalaContainer Render ', this.props)
    return (
      <div className="app-children">
      {
        this.props.koalas.map(k => {
          return <img src={k.image_url} />
        })
      }
      </div>
    )
  }
}

export default KoalaContainer
