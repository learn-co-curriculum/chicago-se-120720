
const auth = (state = null, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
    case 'CURRENT_USER':
      return {
        id: action.user.id,
        username: action.user.username
      }
    default: 
      return state
  }
}

export default auth
