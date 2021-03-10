

const posts = (state = [] , action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return action.user.posts
    default: 
      return state
  }
}

export default posts
