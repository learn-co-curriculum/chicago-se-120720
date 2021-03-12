import { combineReducers } from 'redux';
import { FETCH_PAINTINGS, SELECT_ACTIVE_PAINTING } from './actions/types';

const paintingsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PAINTINGS:
      return [...action.artworks];
    case 'DELETE_PAINTING':
      return state.filter(p => p.id !== action.id )
    default:
      return state;
  }
};

const activePaintingIdReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PAINTINGS:
      return action.artworks[0].id
    case SELECT_ACTIVE_PAINTING:
      return action.id;
    case 'DELETE_PAINTING':
      return null
    case 'SELECT_MUSEUM':
      return null
    default:
      return state;
  }
};

const filterReducer= (state = '', action) => {
  switch (action.type) {
    case 'SELECT_MUSEUM':
      return action.museumName
    default:
      return state;
  }
};






const rootReducer = combineReducers({
  paintings: paintingsReducer,
  activePaintingId: activePaintingIdReducer,
  filter: filterReducer
});

export default rootReducer;
