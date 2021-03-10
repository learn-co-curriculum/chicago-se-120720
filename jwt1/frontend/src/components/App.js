import React from 'react';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar icon="paint brush" title="Painterest" description="out app" />
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
