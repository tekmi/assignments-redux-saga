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
    return {
        type: actionTypes.USER_GET_INIT,
        token: token,
        userId: userId
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
    return {
        type: actionTypes.USER_UPDATE_INIT,
        token: token,
        userId: userId,
        userDetails: userDetails
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
