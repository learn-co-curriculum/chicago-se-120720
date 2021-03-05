
const initialState = [
]


const paintingsReducer = (state=initialState, action) => {
  let updatedState;
  switch(action.type) {
    case 'FETCH_PAINTINGS_SUCCESS':
      return action.paintings
    case 'DELETE_PAINTING':
      updatedState = state.filter(paintingObj => paintingObj.id !== action.id )
      return updatedState
    case 'UPVOTE_PAINTING':
      updatedState = state.map(paintingObj => {
        if (paintingObj.id === action.id){
          return {
            ...paintingObj,
            votes: paintingObj.votes + 1
          }
        } else {
          return paintingObj
        }
      })

      return updatedState
    default: 
      return state
  }
}


export default paintingsReducer
