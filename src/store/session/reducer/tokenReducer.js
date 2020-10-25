import { LOGIN } from '../../login/actionCreator/loginCompleteActionCreator'

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      if (action?.payload?.token) return action.payload.token
      return state
    default:
      return state
  }
}

export default tokenReducer
