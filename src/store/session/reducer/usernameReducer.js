import { LOGIN } from '../../login/actionCreator/loginCompleteActionCreator'

const usernameReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      if (action?.payload?.username) return action.payload.username
      return state
    default:
      return state
  }
}

export default usernameReducer
