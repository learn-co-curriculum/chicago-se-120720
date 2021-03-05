import React from 'react';
import Navbar from './Navbar';
import PaintingList from './PaintingList';
import About from './About';
import Login from './Login';
import {BrowserRouter} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar icon="paint brush" title="Painterest" description="out app" />
        <PaintingList />
      </div>
    </BrowserRouter>
  );
};

export default App;




