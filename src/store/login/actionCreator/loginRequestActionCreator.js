export const LOGIN_REQUEST = 'LOGIN_REQUEST'

const loginRequestActionCreator = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
})

export default loginRequestActionCreator
