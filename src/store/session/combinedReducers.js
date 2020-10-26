import { combineReducers } from 'redux'
import tokenReducer from './reducer/tokenReducer'
import emailReducer from './reducer/emailReducer'
import profileReducer from './reducer/profileReducer'

const sessionCombinedReducers = combineReducers({
  token: tokenReducer,
  email: emailReducer,
  profile: profileReducer,
})


export default sessionCombinedReducers
