import { takeEvery, call, put, fork } from 'redux-saga/effects'
import { getAuth } from './api'
import { save } from '../../localStorage'
import {
    loginSubmitRequest,
    loginSubmitSuccess,
    loginSubmitFailure,
    logoutSubmit
} from './actions'

export function* loginFlow(action) {
  const { username, password } = action.payload;
  try {
    const response = yield call(getAuth, username, password)
    if (response.success) {
      yield call(save, 'isAuthorized', true)
      yield put(loginSubmitSuccess(action.payload))
    } else {
      yield put(loginSubmitFailure(response.error))
    }
  } catch (error) {
    yield put(loginSubmitFailure(action.payload))
  }
}

export function* logoutFlow(action) {
  try {
    yield call(save, 'isAuthorized', false)
  } catch (error) {
    console.log(error)
  }
}

function* authWatcher() {
  yield takeEvery(loginSubmitRequest, loginFlow)
  yield takeEvery(logoutSubmit, logoutFlow)
}

export default function*() {
  yield fork(authWatcher)}