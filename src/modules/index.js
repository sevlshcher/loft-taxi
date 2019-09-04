import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import auth, { sagas as authSagas } from './Auth';
import payment, { sagas as paymentSagas } from './Payment';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({ auth, payment, form: formReducer });

export function* rootSaga() {
  yield fork(authSagas);
  yield fork(paymentSagas);
}
