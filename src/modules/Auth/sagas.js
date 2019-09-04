import { takeEvery, call, put } from 'redux-saga/effects'
import { getAuth } from './api'
import {
    loginSubmitRequest,
    loginSubmitSuccess,
    loginSubmitFailure
} from './actions'

function* authWatcher() {
    yield takeEvery(loginSubmitRequest, loginFlow)
  }

export function* loginFlow(action) {
  const { username, password } = action.payload;
  try {
    const response = yield call(getAuth, username, password)
    if (response.success) {
      yield put(loginSubmitSuccess())
    } else {
      yield put(loginSubmitFailure())
    }
  } catch (error) {
    yield put(loginSubmitFailure())
  }
}

export default authWatcher