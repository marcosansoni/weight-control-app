import { LOGIN } from '../actionCreator/loginCompleteActionCreator'
import { LOGIN_REQUEST } from '../actionCreator/loginRequestActionCreator'
import { STOP_FETCH } from '../../common/actionCreator/stopFetchingActionCreatorFactory'
import View from '../../View'

const isFetchingLoginReducer = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return true
    case LOGIN:
      return false
    case STOP_FETCH:
      if (action?.view === View.LOGIN) return false
      return state
    default:
      return state
  }
}

export default isFetchingLoginReducer
