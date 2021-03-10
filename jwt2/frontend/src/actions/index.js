

export const loginSuccess = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    user: user
  }
}

export const currentUser = (user) => {
  return {
    type: 'CURRENT_USER',
    user: user
  }
}
