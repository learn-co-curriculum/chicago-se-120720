
import React from 'react';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`ui inverted blue menu`}>
        <Link to={'/'}>
          <div className="ui header">
            <i className={`${this.props.icon} icon`} />
            <div className="content">{this.props.title}</div>
            <div className="sub header">{this.props.description}</div>
          </div>
        </Link>
        <div className="right menu">
        </div>
      </div>
    );
  }
}

export default Navbar;
