

import React from 'react';
import { Link }  from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <div className={`ui inverted blue menu`}>
        <Link className="ui header" to='/'>
          <i className={`${this.props.icon} icon`} />
          <div className="content">{this.props.title}</div>
          <div className="sub header">{this.props.description}</div>
        </Link>
        <div className="right menu">
          <Link className="item" to='/login'>
            Login 
          </Link>
          <Link className="item" to='/about'>
            About Page
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
