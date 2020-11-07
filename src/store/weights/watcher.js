import { takeLatest } from 'redux-saga/effects'
import { WEIGHTS_REQUEST } from './actionCreator/weightsRequestActionCreator'
import getWeightWorker from './worker/getWeightWorker'
import { CREATE_WEIGHT } from './actionCreator/createWeightActionCreator'
import postWeightWorker from './worker/postWeightWorker'
import { DELETE_WEIGHT } from './actionCreator/deleteWeightActionCreator'
import deleteWeightWorker from './worker/deleteWeightWorker'

const watcher = [
  takeLatest(WEIGHTS_REQUEST, getWeightWorker),
  takeLatest(CREATE_WEIGHT, postWeightWorker),
  takeLatest(DELETE_WEIGHT, deleteWeightWorker),
]

export default watcher
