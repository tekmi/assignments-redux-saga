import * as actionTypes from './actionTypes';
import axios from './../../helpers/axios';
import {authLogout} from "./auth";

export const userGetStart = () => {
    return {
        type: actionTypes.USER_GET_START
    }
};

export const userGetSuccess = (userDetails) => {
    return {
        type: actionTypes.USER_GET_SUCCESS,
        userDetails: userDetails
    }
};

export const userGetFail = (errorMessage) => {
    return {
        type: actionTypes.USER_GET_FAIL,
        errorMessage: errorMessage
    }
};

export const userGet = (token, userId) => {
    return dispatch => {
        dispatch(userGetStart());

        const config = {
            "headers": {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get(`/users/${userId}`, config)
            .then(response => {
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

                dispatch(userGetSuccess(userDetails));
            })
            .catch(err => {
                dispatch(userGetFail(err.response.data.errorMessage));
            });
    }
};

export const userUpdateStart = () => {
    return {
        type: actionTypes.USER_UPDATE_START
    }
};

export const userUpdateSuccess = (userDetails) => {
    return {
        type: actionTypes.USER_UPDATE_SUCCESS,
        userDetails: userDetails
    }
};

export const userUpdateFail = (errorMessage) => {
    return {
        type: actionTypes.USER_UPDATE_FAIL,
        errorMessage: errorMessage
    }
};

export const userUpdate = (token, userId, userDetails) => {
    return dispatch => {
        dispatch(userUpdateStart());

        let data = {
            "name": userDetails.name,
            "companyName": userDetails.companyName,
            "addresses": [
                {
                    "@id": userDetails.billingAddressUri,
                    "street": userDetails.billingAddress,
                    "city": userDetails.billingCity,
                    "postalCode": userDetails.billingPostalCode,
                    "countryCode": userDetails.billingCountry
                }
            ]
        };

        const config = {
            "headers": {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.put(`/users/${userId}`, data, config)
            .then(response => {
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

                dispatch(userUpdateSuccess(userDetails));
            })
            .catch(err => {
                dispatch(userUpdateFail(err.response.data.errorMessage));
            });
    }
};

export const userDeleteSuccess = () => {
    return {
        type: actionTypes.USER_DELETE_SUCCESS,
    }
};

export const userDeleteFail = (errorMessage) => {
    return {
        type: actionTypes.USER_DELETE_FAIL,
        errorMessage: errorMessage
    }
};

export const userDelete = (token, userId) => {
    return dispatch => {

        const config = {
            "headers": {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.delete(`/users/${userId}`, config)
            .then(response => {
                dispatch(userDeleteSuccess());
                dispatch(authLogout());
            })
            .catch(err => {
                dispatch(userDeleteFail(err.response.data.errorMessage));
            });
    }
};
