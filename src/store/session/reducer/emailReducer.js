import { LOGIN } from '../../login/actionCreator/loginCompleteActionCreator'

const emailReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      if (action?.payload?.email) return action.payload.email
      return state
    default:
      return state
  }
}

export default emailReducer
