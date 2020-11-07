import { LOGIN } from '../../login/actionCreator/loginCompleteActionCreator'
import { LOGOUT } from '../../logout/actionCreator/logoutActionCreator'

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      if (action?.payload?.token) return action.payload.token
      return state
    case LOGOUT:
      return null
    default:
      return state
  }
}

export default tokenReducer
