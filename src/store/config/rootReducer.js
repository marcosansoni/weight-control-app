import { combineReducers } from 'redux'
import themeReducer from '../theme/themeReducer'
import sessionCombinedReducers from '../session/combinedReducers'
import loginCombinedReducers from '../login/combinedReducers'

export default combineReducers({
  login: loginCombinedReducers,
  session: sessionCombinedReducers,
  theme: themeReducer,
})
