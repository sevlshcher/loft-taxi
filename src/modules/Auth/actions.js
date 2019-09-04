import { createAction } from 'redux-actions';

export const loginSubmitRequest = createAction('HANDLE_LOGIN_REQUEST')
export const loginSubmitSuccess = createAction('HANDLE_LOGIN_SUCCESS')
export const loginSubmitFailure = createAction('HANDLE_LOGIN_FAILURE')
export const logoutSubmit = createAction('HANDLE_UNAUTHORIZE')