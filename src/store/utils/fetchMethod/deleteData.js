import { select } from 'redux-saga/effects'
import axios from 'axios'
import tokenSelector from '../../session/selectors/tokenSelector'

function* deleteData({ url }) {
  // Get the session used for api call
  const token = yield select(tokenSelector)

  return yield axios
    .delete(url, {
      headers: {
        token,
      },
    })
    .then((response) => response)
    // .then((res) => res)
    .catch((err) => err.response)
}

export default deleteData
