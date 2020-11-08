import { ERRORS } from '../../common/actionCreator/errorsActionCreatorFactory'
import View from '../../View'

const errorWeightsReducer = (state = [], action) => {
  switch (action.type) {
    case ERRORS:
      // console.log(action)
      if (action?.view === View.WEIGHT) return action.payload.errors
      return state
    default:
      return state
  }
}

export default errorWeightsReducer
