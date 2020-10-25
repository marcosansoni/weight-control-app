import { combineReducers } from 'redux'
import tokenReducer from './reducer/tokenReducer'
import usernameReducer from './reducer/usernameReducer'
import profileReducer from './reducer/profileReducer'

const sessionCombinedReducers = combineReducers({
  token: tokenReducer,
  username: usernameReducer,
  profile: profileReducer,
})


export default sessionCombinedReducers
