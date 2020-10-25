import axios from 'axios'
import { select } from 'redux-saga/effects'
import tokenSelector from '../../session/selectors/tokenSelector'

function* postData({ url, data }) {
  // Get the session used for api call
  const token = yield select(tokenSelector)

  console.log(data)

  return yield axios(
    {
      url,
      method: 'POST',
      headers: {
        token,
      },
      data,
    }
  )
    .then((response) => response)
    // .then((res) => res)
    .catch((err) => err.response)
}

export default postData
