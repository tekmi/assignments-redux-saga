import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    }
};

export const authFail = (errorMessage) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errorMessage: errorMessage
    }
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_INIT
    }
};

export const authLogoutSucceeded = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const auth = (email, password) => {
    return {
        type: actionTypes.AUTH_INIT,
        email: email,
        password: password
    }
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE_INIT
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    }
};

export const registerSuccess = (email) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        registeredEmail: email
    }
};

export const registerFail = (errorMessage) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        errorMessage: errorMessage
    }
};

export const registerCleanup = (email) => {
    localStorage.setItem('lastRegisteredEmail', email);
    return {
        type: actionTypes.REGISTER_CLEANUP,
    }
};

export const register = (data) => {
    return {
        type: actionTypes.REGISTER_INIT,
        data: data
    }
};

