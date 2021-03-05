


import { combineReducers } from 'redux'
import paintingsReducer from './paintingsReducer'


export default combineReducers({
  paintings: paintingsReducer
})
