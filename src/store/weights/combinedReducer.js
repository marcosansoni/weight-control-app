import { combineReducers } from 'redux'
import isFetchingWeightsReducer from './reducers/isFetchingWeightsReducer'
import byIdWeightsReducer from './reducers/byIdWeightsReducer'
import errorWeightsReducer from './reducers/errorWeightsReducer'

const weightsCombinedReducers = combineReducers({
  isFetching: isFetchingWeightsReducer,
  byId: byIdWeightsReducer,
  errors: errorWeightsReducer,
})

export default weightsCombinedReducers
