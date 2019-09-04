import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { load } from '../../localStorage';
import {
    loginSubmitRequest,
    loginSubmitSuccess,
    loginSubmitFailure,
    logoutSubmit
} from './actions';

const isAuthorized = handleActions({
    [loginSubmitRequest]: (_state, action) => false,
    [loginSubmitSuccess]: (_state, action) => true,
    [loginSubmitFailure]: (_state, action) => false,
    [logoutSubmit]: (_state, action) => false,
}, load('isAuthorized'))

const authError = handleActions({
    [loginSubmitRequest]: (_state, action) => null,
    [loginSubmitSuccess]: (_state, action) => null,
    [loginSubmitFailure]: (_state, action) => action.payload,
}, null)

export default combineReducers({ isAuthorized, authError })

export const getIsAuthorized = state => state.auth.isAuthorized
export const getauthError = state => state.auth.authError