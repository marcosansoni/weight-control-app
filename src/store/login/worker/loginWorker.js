import { put } from 'redux-saga/effects'
import postData from '../../utils/fetchMethod/postData'
import PathAPI, { urlFactory } from '../../../constants/PathAPI'
import loginCompleteActionCreator from '../actionCreator/loginCompleteActionCreator'
import stopFetchingActionCreatorFactory from '../../common/actionCreator/stopFetchingActionCreatorFactory'
import View from '../../View'

export const defaultError = ['Error while handling the request']

function* loginWorker(action) {
  try {
    const { email, password } = action?.payload || {}

    console.log(urlFactory())

    const response = yield postData({
      url: urlFactory(PathAPI.LOGIN),
      data: { email, password },
    })

    const { data, status } = response || {}
    const { success, result, errors = defaultError } = data || {}

    if (!success || status !== 200)
      return yield put(loginCompleteActionCreator({ errors }))

    if (status === 200 && success) {
      const { token } = result
      return yield put(loginCompleteActionCreator({ token, email }))
    }

    return yield put(loginCompleteActionCreator({}))
  } catch (e) {
    console.log(e)
    // Stop fetching into all the other scenario
    return yield put(stopFetchingActionCreatorFactory(View.LOGIN))
  }
}

export default loginWorker
