
//action creator:
//   - is a function that builds and returns an action
//
export const fetchPaintingsSuccess = (paintings) => {
  return {
    type: 'FETCH_PAINTINGS_SUCCESS',
    paintings: paintings
  }
}

export const deletePainting = (id) => {
  return {
    type: 'DELETE_PAINTING',
    id: id
  }
}



export const upvotePainting = (id) => {
  return {
    type: 'UPVOTE_PAINTING',
    id: id
  }
}


