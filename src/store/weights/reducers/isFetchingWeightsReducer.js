import { WEIGHTS_REQUEST } from '../actionCreator/weightsRequestActionCreator'
import { WEIGHTS_COMPLETE } from '../actionCreator/weightsCompleteActionCreator'
import { STOP_FETCH } from '../../common/actionCreator/stopFetchingActionCreatorFactory'
import View from '../../View'

const isFetchingWeightsReducer = (state = false, action) => {
  switch (action.type) {
    case WEIGHTS_REQUEST:
      return true
    case WEIGHTS_COMPLETE:
      return false
    case STOP_FETCH:
      if (action?.view === View.WEIGHT) return false
      return state
    default:
      return state
  }
}

export default isFetchingWeightsReducer
