
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import rootReducer from './reducers/index'
import 'semantic-ui-css/semantic.min.css';

import { createStore } from 'redux'


const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
