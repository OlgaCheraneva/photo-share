import {LOGOUT, LOGIN, AUTH_ERROR, SET_AUTH_LOADING} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    errors: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false,
            };
        case AUTH_ERROR:
            return {
                ...state,
                errors: [...state.errors, action.payload],
                loading: false,
            };
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
