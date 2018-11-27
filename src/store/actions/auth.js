import * as actionTypes from './actionTypes';
import axios from './../../helpers/axios';
import jwt_decode from 'jwt-decode';

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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        let data = {
            "username": email,
            "password": password
        };

        axios.post("/login_check", data)
            .then(response => {
                const decoded = jwt_decode(response.data.token);
                let user = {
                    id: decoded.user_id,
                    email: decoded.username
                };
                const expirationDate = new Date(decoded.exp*1000);

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate.toISOString());
                localStorage.setItem('user', JSON.stringify(user));

                dispatch(authSuccess(response.data.token, user));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.errorMessage));
            });
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
            return;
        }

        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));

        dispatch(authSuccess(token, user));
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
    return dispatch => {
        dispatch(registerStart());

        data = {
            "email": data.email,
            "name": data.name,
            "companyName": data.companyName,
            "password": data.password,
            "addresses": [
                {
                    "street": data.billingAddress,
                    "city": data.billingCity,
                    "postalCode": data.billingPostalCode,
                    "countryCode": data.billingCountry
                }
            ]
        };

        const config = {
            "headers": {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            }
        };

        axios.post("/users", data, config)
            .then(response => {
                dispatch(registerSuccess(response.data.email));
            })
            .catch(err => {
                dispatch(registerFail(err.response.data.errorMessage));
            });
    };
};

