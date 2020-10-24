import { combineReducers } from 'redux'
import sessionReducer from '../session/sessionReducer'
import themeReducer from '../theme/themeReducer'

export default combineReducers({
  session: sessionReducer,
  theme: themeReducer,
})
