import { LOGIN } from '../actionCreator/loginCompleteActionCreator'
import { LOGIN_REQUEST } from '../actionCreator/loginRequestActionCreator'

const isFetchingLoginReducer = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return true
    case LOGIN:
      return false
    default:
      return state
  }
}

export default isFetchingLoginReducer
