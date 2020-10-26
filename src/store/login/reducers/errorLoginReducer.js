import { LOGIN } from '../actionCreator/loginCompleteActionCreator'

const errorLoginReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      console.log(action?.payload?.errors)
      if (action?.payload?.errors) return action.payload.errors
      return state
    default:
      return state
  }
}

export default errorLoginReducer
