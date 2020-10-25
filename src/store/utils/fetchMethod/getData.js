import axios from 'axios'
import { select } from 'redux-saga/effects'
import tokenSelector from '../../session/selectors/tokenSelector'

function* getData({ url }) {
  // Get the session used for api call
  const token = yield select(tokenSelector)

  return yield axios
    .get(url, {
      headers: {
        token,
      },
    })
    .then((response) => response)
    // .then((res) => res)
    .catch((err) => err.response)
}

export default getData;
