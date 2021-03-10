import React from 'react';
import { connect } from 'react-redux'


class Dashboard extends React.Component {
  componentDidMount(){
    if (!this.props.auth) {
      this.props.history.push('/login')
    }
  }


  render(){
    return (
      <div>
          <h5>Welcome to the dashboard</h5>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth 
  }
}

export default connect(mapStateToProps)(Dashboard)








