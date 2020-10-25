export const LOGIN_REQUEST = 'LOGIN_REQUEST'

const loginRequestActionCreator = (username, password) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
})

export default loginRequestActionCreator
