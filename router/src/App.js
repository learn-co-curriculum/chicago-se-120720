
import React from 'react';
import Navbar from './Navbar';
import About from './About';
import PaintingList from './PaintingList';
import Login from './Login';
import Dashboard from './Dashboard';
import { Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <Navbar icon="paint brush" title="Painterest" description="out app" />
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />

        <Route path='/dashboard/:title' component={Dashboard} />

        <Route exact path='/' component={PaintingList} />
      </Switch>
    </div>
  );
};

export default App;





