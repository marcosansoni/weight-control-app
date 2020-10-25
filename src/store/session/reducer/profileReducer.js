import { LOGIN } from '../../login/actionCreator/loginCompleteActionCreator'

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      if (action?.payload?.profile) return action.payload.profile
      return state
    default:
      return state
  }
}

export default profileReducer
