import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

const configureStore = () => {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};
export default configureStore;
