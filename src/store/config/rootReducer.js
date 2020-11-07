import { combineReducers } from 'redux'
import themeReducer from '../theme/themeReducer'
import sessionCombinedReducers from '../session/combinedReducers'
import loginCombinedReducers from '../login/combinedReducers'
import weightsCombinedReducers from '../weights/combinedReducer'

export default combineReducers({
  login: loginCombinedReducers,
  weights: weightsCombinedReducers,
  session: sessionCombinedReducers,
  theme: themeReducer,
})
