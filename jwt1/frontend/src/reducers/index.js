
import { combineReducers } from 'redux'
import authReducer from './auth'
import postsReducer from './posts'

export default combineReducers({
  auth: authReducer,
  posts: postsReducer
})






