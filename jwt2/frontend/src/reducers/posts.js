

const posts = (state = [] , action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
    case 'CURRENT_USER':
      return action.user.posts
    default: 
      return state
  }
}

export default posts
