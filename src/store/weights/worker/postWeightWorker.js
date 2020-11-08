import { put } from 'redux-saga/effects'
import PathAPI, { urlFactory } from '../../../constants/PathAPI'
import stopFetchingActionCreatorFactory from '../../common/actionCreator/stopFetchingActionCreatorFactory'
import View from '../../View'
import postData from '../../utils/fetchMethod/postData'
import errorsActionCreatorFactory from '../../common/actionCreator/errorsActionCreatorFactory'
import weightsRequestActionCreator from '../actionCreator/weightsRequestActionCreator'

function* postWeightWorker(action) {
  try {
    const payload = action?.payload
    const response = yield postData({
      url: urlFactory(PathAPI.WEIGHT),
      data: payload,
    })

    const { data, status } = response || {}
    const { success, errors = [] } = data || {}

    if (!success || status !== 200) {
      yield stopFetchingActionCreatorFactory(View.WEIGHT)
      return yield put(errorsActionCreatorFactory(View.WEIGHT, errors))
    }

    if (status === 200 && success) {
      // console.log('here')
      return yield put(weightsRequestActionCreator())
    }

    //
    return yield put(stopFetchingActionCreatorFactory(View.WEIGHT))
  } catch (e) {
    // Stop fetching into all the other scenario
    return yield put(stopFetchingActionCreatorFactory(View.WEIGHT))
  }
}

export default postWeightWorker
