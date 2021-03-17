





export default function paintings(state = [], action) {
  let updatedPaintings;

  switch (action.type) {
    case 'FETCH_PAINTINGS_SUCCESS':
      return action.paintings
    case 'DELETE_PAINTING_SUCCESS':
      return state.filter( p => p.id !== action.id )
    case 'UPVOTE_SUCCESS':
      return state.map(p  => (p.id === action.painting.id) ? action.painting : p)
    default:
      return state
  }
}





















