// To fix bug: Uncaught ReferenceError: regeneratorRuntime is not defined, check out https://github.com/redux-saga/redux-saga/issues/280
import "regenerator-runtime/runtime";

import {put} from 'redux-saga/effects';
import axios from './../../helpers/axios';
import jwt_decode from 'jwt-decode';

import * as actions from './../actions/index';

export function* authLogoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('user');

    yield put(actions.authLogoutSucceeded());
}

export function* authSaga(action) {
    yield put(actions.authStart());

    let data = {
        "username": action.email,
        "password": action.password
    };

    try {
        // This will wait until the Promise either resolves or rejects, pausing the execution of js.
        // It handles the code asynchronously, but from code it looks like everything happens synchronously, step by step.
        const response = yield axios.post("/login_check", data);

        const decoded = jwt_decode(response.data.token);

        let user = {
            id: decoded.user_id,
            email: decoded.username
        };
        const expirationDate = yield new Date(decoded.exp*1000);

        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('expirationDate', expirationDate.toISOString());
        yield localStorage.setItem('user', JSON.stringify(user));

        yield put(actions.authSuccess(response.data.token, user));
    } catch (err) {
        yield put(actions.authFail(err.response.data.errorMessage));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.authLogout());
        return;
    }

    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
        yield put(actions.authLogout());
        return;
    }

    const user = yield JSON.parse(localStorage.getItem('user'));
    yield put(actions.authSuccess(token, user));
}

export function* registerSaga(action) {
    yield put(actions.registerStart());

    let data = {
        "email": action.data.email,
        "name": action.data.name,
        "companyName": action.data.companyName,
        "password": action.data.password,
        "addresses": [
            {
                "street": action.data.billingAddress,
                "city": action.data.billingCity,
                "postalCode": action.data.billingPostalCode,
                "countryCode": action.data.billingCountry
            }
        ]
    };

    const config = {
        "headers": {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    };

    try {
        const response = yield axios.post("/users", data, config);

        yield put(actions.registerSuccess(response.data.email));
    } catch (err) {
        yield put(actions.registerFail(err.response.data.errorMessage));
    }
}

