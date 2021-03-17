import { FETCH_PAINTINGS, SELECT_ACTIVE_PAINTING } from './types';
import artworks from '../data/artworks';

export function fetchPaintings() {
  return { type: FETCH_PAINTINGS, artworks: artworks };
}

export function selectPainting(activeID) {
  return { type: SELECT_ACTIVE_PAINTING, id: activeID };
}



export function deletePainting(id) {
  return { type: 'DELETE_PAINTING', id: id};
}

export function selectMuseum(museumName) {
  return { type: 'SELECT_MUSEUM', museumName };
}



export const selectMuseumThunk = (museumName) => {
  return (dispatch, getState) => {
    dispatch(selectMuseum(museumName)) // filter: 'WASHINTon"

    const state = getState()

    const filteredPaintings= state.paintings.filter(p => p.museum.name.includes(state.filter))

    dispatch(selectPainting(filteredPaintings[0].id))
    
  }
}




    // dispatch will update filter
    // this will change the state
    // we are going to read the new state in order to dispatch another thing
    // this dispatch will update a different slice of state
