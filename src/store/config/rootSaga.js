import { all } from 'redux-saga/effects'
import loginWatcher from '../login/watcher'

export default function* rootSaga() {
  yield all([...loginWatcher])
}
