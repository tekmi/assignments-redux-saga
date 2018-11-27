import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user_details: null,
    loading: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_GET_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.USER_GET_SUCCESS:
            return {
                ...state,
                user_details: action.userDetails,
                loading: false
            };
        case actionTypes.USER_GET_FAIL:
            return {
                ...state,
                user_details: null,
                loading: false
            };
        case actionTypes.USER_UPDATE_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.USER_UPDATE_SUCCESS:
            return {
                ...state,
                user_details: action.userDetails,
                loading: false
            };
        case actionTypes.USER_UPDATE_FAIL:
            return {
                ...state,
                user_details: null,
                loading: false
            };
    }
    return state;
};
