import { takeLatest } from 'redux-saga/effects'
import { LOGIN_REQUEST } from './actionCreator/loginRequestActionCreator'
import loginWorker from './worker/loginWorker'

const watcher = [takeLatest(LOGIN_REQUEST, loginWorker)]

export default watcher
