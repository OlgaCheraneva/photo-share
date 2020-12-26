import {
    LOGOUT,
    LOGIN,
    AUTH_ERROR,
    SET_AUTH_LOADING,
    ADD_SUBSCRIPTION,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    profile: null,
    loading: false,
    errors: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                profile: null,
                loading: false,
            };
        case AUTH_ERROR:
            return {
                ...state,
                errors: [...state.errors, action.payload],
                isAuthenticated: false,
                token: null,
                profile: null,
                loading: false,
            };
        case ADD_SUBSCRIPTION:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    subscriptions: action.payload,
                },
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
