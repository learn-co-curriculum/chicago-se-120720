import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

  render() {
    return (
      <div className={`ui inverted yellow menu`}>
        <Link to='/dashboard' className="item">
          <h2 className="ui header">
            <div className="content">My App</div>
          </h2>
        </Link>
        <div className="right menu">
          <div className="item">
            <Link to='/login' className="ui button" >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}


export default Navbar






