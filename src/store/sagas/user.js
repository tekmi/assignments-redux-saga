// To fix bug: Uncaught ReferenceError: regeneratorRuntime is not defined, check out https://github.com/redux-saga/redux-saga/issues/280
import "regenerator-runtime/runtime";

import {put} from 'redux-saga/effects';
import axios from './../../helpers/axios';

import * as actions from './../actions/index';

export function* userGetSaga(action) {
    yield put(actions.userGetStart());

    const config = {
        "headers": {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/ld+json',
            'Authorization': `Bearer ${action.token}`
        }
    };

    try {
        const response = yield axios.get(`/users/${action.userId}`, config);
        let userDetails = {
            id: response.data.id,
            name: response.data.name,
            companyName: response.data.companyName,
            billingAddress: response.data.addresses[0].street,
            billingCity: response.data.addresses[0].city,
            billingPostalCode: response.data.addresses[0].postalCode,
            billingCountry: response.data.addresses[0].countryCode,
            billingAddressUri: response.data.addresses[0]['@id']
        };

        yield put(actions.userGetSuccess(userDetails));
    } catch (err) {
        yield put(actions.userGetFail(err.response.data.errorMessage));
    }
}

export function* userUpdateSaga(action) {
    yield put(actions.userUpdateStart());

    let data = {
        "name": action.userDetails.name,
        "companyName": action.userDetails.companyName,
        "addresses": [
            {
                "@id": action.userDetails.billingAddressUri,
                "street": action.userDetails.billingAddress,
                "city": action.userDetails.billingCity,
                "postalCode": action.userDetails.billingPostalCode,
                "countryCode": action.userDetails.billingCountry
            }
        ]
    };

    const config = {
        "headers": {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/ld+json',
            'Authorization': `Bearer ${action.token}`
        }
    };

    try {
        const response = yield axios.put(`/users/${action.userId}`, data, config);

        let userDetails = {
            id: response.data.id,
            name: response.data.name,
            companyName: response.data.companyName,
            billingAddress: response.data.addresses[0].street,
            billingCity: response.data.addresses[0].city,
            billingPostalCode: response.data.addresses[0].postalCode,
            billingCountry: response.data.addresses[0].countryCode,
            billingAddressUri: response.data.addresses[0]['@id']
        };

        yield put(actions.userUpdateSuccess(userDetails));
    } catch (err) {
        yield put(actions.userUpdateFail(err.response.data.errorMessage));
    }
}

