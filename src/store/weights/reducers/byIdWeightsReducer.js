import { LOGIN } from '../../login/actionCreator/loginCompleteActionCreator'
import { WEIGHTS_COMPLETE } from '../actionCreator/weightsCompleteActionCreator'

const byIdWeightReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {}
    case WEIGHTS_COMPLETE:
      if (action?.payload?.byId) return action.payload.byId
      return state
    default:
      return state
  }
}

export default byIdWeightReducer
