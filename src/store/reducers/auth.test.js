import {authReducer} from './auth';
import * as actionTypes from './../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            user: null,
            registration_error: null,
            login_error: null,
            registered_email: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(authReducer({
            token: null,
            user: null,
            registration_error: null,
            login_error: null,
            registered_email: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'MyToken',
            user: {
                id: 10,
                email: "support@tekmi.nl"
            }
        })).toEqual({
            token: 'MyToken',
            user: {id: 10, email: "support@tekmi.nl"},
            registration_error: null,
            login_error: null,
            registered_email: null,
            loading: false,
            authRedirectPath: '/'
        })
    });
});
