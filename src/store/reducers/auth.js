import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    user: null,
    registration_error: null,
    login_error: null,
    registered_email: null,
    loading: false,
    authRedirectPath: '/'
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_START:
            return {
                ...state,
                registration_error: null,
                registered_email: null,
                loading: true
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                registration_error: null,
                registered_email: action.registeredEmail,
                loading: false
            };
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                registration_error: action.errorMessage,
                registered_email: null,
                loading: false
            };
        case actionTypes.REGISTER_CLEANUP:
            return {
                ...state,
                registered_email: null,
                registration_error: null,
                loading: false
            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                login_error: null,
                loading: true
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                login_error: action.errorMessage,
                loading: false
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                login_error: null,
                token: action.token,
                user: action.user,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                user: null
            };
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }
    }
    return state;
};
