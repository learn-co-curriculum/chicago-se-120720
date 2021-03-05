

import React from 'react';
import { Link } from 'react-router-dom'

class PaintingShow extends React.Component {
  componentDidMount(){
    const id = this.props.match.params.paintingId
    const url = `http://localhost:3000/`
    // fetch()
    // .then
  }

  render() {
    console.log(this.props)
    return (
      <div className={`app`}>
        PAINTING SHOW PAGE
      </div>
    );
  }
}

export default PaintingShow;
