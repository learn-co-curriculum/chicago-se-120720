
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom'


// RRD providers 4 components that you'll need to use
//   BrowserRouter - Allows for react-router-dom to listen to changes in the path and swap components
//   Link - it is a UI element that allows for users to click on something and it will update the url bar with the to path provided
//   Route - will check as soon as the url changes to see if it matches with the path that it was provided. If there is a fuzzy match, it will render the passed in component.
//   Switch - allows for you to bundle possible routes together and have react choose just one of whatever is bundled

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

