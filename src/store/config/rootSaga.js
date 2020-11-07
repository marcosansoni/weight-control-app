import { all } from 'redux-saga/effects'
import loginWatcher from '../login/watcher'
import weightsWatcher from '../weights/watcher'

export default function* rootSaga() {
  yield all([...loginWatcher, ...weightsWatcher])
}
