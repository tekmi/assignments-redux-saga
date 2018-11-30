import { takeEvery } from 'redux-saga/effects'

import {authSaga, authLogoutSaga, authCheckStateSaga, registerSaga} from "./auth";
import {userGetSaga, userUpdateSaga} from "./user";

import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_LOGOUT_INIT, authLogoutSaga);
    yield takeEvery(actionTypes.AUTH_INIT, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE_INIT, authCheckStateSaga);
    yield takeEvery(actionTypes.REGISTER_INIT, registerSaga);
}

export function* watchUser() {
    yield takeEvery(actionTypes.USER_GET_INIT, userGetSaga);
    yield takeEvery(actionTypes.USER_UPDATE_INIT, userUpdateSaga);
}