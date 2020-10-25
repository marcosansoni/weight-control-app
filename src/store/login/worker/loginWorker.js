import { put } from 'redux-saga/effects'
import postData from '../../utils/fetchMethod/postData'
import PathAPI, { urlFactory } from '../../../constants/PathAPI'
import loginCompleteActionCreator from '../actionCreator/loginCompleteActionCreator'

export const defaultError = ['Error while handling the request']

function* loginWorker(action) {
  const { username, password } = action?.payload || {}

  const response = yield postData({
    url: urlFactory(PathAPI.LOGIN),
    data: { username, password },
  })

  const { data, status } = response || {}
  const { success, result, errors = defaultError } = data || {}

  if (!success || status !== 200)
    yield put(loginCompleteActionCreator({ errors }))

  if (status === 200 && success) {
    yield put(loginCompleteActionCreator({ errors }))
    // const session = data.code
    // yield put(
    //   actionCreator(SessionActionType.POST_LOGIN, { username, session })
    // )
  }

  return yield put({ type: SessionActionType.POST_LOGIN })
}

export default loginWorker
