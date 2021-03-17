
// action creator

export const fetchPaintingsSuccess = (paintings) => {
  return {
    type: 'FETCH_PAINTINGS_SUCCESS',
    paintings: paintings
  }
}

export const deletePaintingSuccess = (id) => {
  return {
    type: 'DELETE_PAINTING_SUCCESS',
    id: id 
  }
}

export const upvoteSuccess = (painting) => {
  return {
    type: 'UPVOTE_SUCCESS',
    painting: painting
  }
}




export const fetchPaintingsThunk = () => {

  return (dispatch, getState) => {

    fetch('http://localhost:3000/paintings')
    .then(resp => resp.json())
    .then(paintings => {
      dispatch(fetchPaintingsSuccess(paintings))
    }) 

  }
}


export const upvotePaintingThunk = (id, votes) => {
  return (dispatch) => {
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify({ votes: votes + 1 })
    }

    fetch(`http://localhost:3000/paintings/${id}`, reqObj)
    .then(resp => resp.json())
    .then(updatedPainting => {
      dispatch(upvoteSuccess(updatedPainting))
    })
  }
}


export const deletePaintingThunk = (id) => {

  return (dispatch) => {
    fetch(`http://localhost:3000/paintings/${id}`, { method: 'DELETE' })
    .then(resp => resp.json())
    .then(data => {
      dispatch(deletePaintingSuccess(id))

    })

  }
}
