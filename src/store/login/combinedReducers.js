import { combineReducers } from 'redux'
import isFetchingLoginReducer from './reducers/isFetchingLoginReducer'
import errorLoginReducer from './reducers/errorLoginReducer'

const loginCombinedReducers = combineReducers({
  errors: errorLoginReducer,
  isFetching: isFetchingLoginReducer,
})

export default loginCombinedReducers
