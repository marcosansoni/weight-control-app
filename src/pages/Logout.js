import { useDispatch } from 'react-redux'
import logoutActionCreator from '../store/logout/actionCreator/logoutActionCreator'

const Logout = () => {
  const dispatch = useDispatch()
  dispatch(logoutActionCreator())

  return null
}

export default Logout
