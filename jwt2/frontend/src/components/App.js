import React from 'react';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import { currentUser } from '../actions/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount(){
    const token = localStorage.getItem('token')

    if (!token) {
      this.props.history.push('/login')
    } else {

      const reqObj = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      fetch('http://localhost:3000/api/v1/current_user', reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error){
          this.props.history.push('/login')
        } else {
          this.props.currentUser(data)
        }
      })
    }
  }


  render(){
    return (
      <div className="App">
        <Navbar icon="paint brush" title="Painterest" description="out app" />
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
};


const mapDispatchToProps = {
  currentUser: currentUser
}

export default connect(null, mapDispatchToProps)(withRouter(App))









