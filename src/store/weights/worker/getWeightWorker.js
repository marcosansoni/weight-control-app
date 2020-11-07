import { put } from 'redux-saga/effects'
import PathAPI, { urlFactory } from '../../../constants/PathAPI'
import getData from '../../utils/fetchMethod/getData'
import weightsCompleteActionCreator from '../actionCreator/weightsCompleteActionCreator'
import stopFetchingActionCreatorFactory from '../../common/actionCreator/stopFetchingActionCreatorFactory'
import View from '../../View'
import errorsActionCreatorFactory from '../../common/actionCreator/errorsActionCreatorFactory'

function* getWeightWorker() {
  try {
    const response = yield getData({ url: urlFactory(PathAPI.WEIGHT) })

    const { data, status } = response || {}
    const { success, result, errors = [] } = data || {}

    if (!success || status !== 200){
      yield stopFetchingActionCreatorFactory(View.WEIGHT)
      return yield put(errorsActionCreatorFactory(View.WEIGHT, errors))
    }

    if (status === 200 && success) {
      let byId = {}
      result.entities.forEach((w) => {
        byId = { ...byId, [w.id]: w }
      })
      return yield put(weightsCompleteActionCreator(byId))
    }

    return yield put(stopFetchingActionCreatorFactory(View.WEIGHT))
  } catch (e) {
    // Stop fetching into all the other scenario
    return yield put(stopFetchingActionCreatorFactory(View.WEIGHT))
  }
}

export default getWeightWorker
