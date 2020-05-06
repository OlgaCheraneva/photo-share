import {SET_AUTH_LOADING, LOGOUT, LOGIN, AUTH_ERROR} from './types';
import {setAlert} from './alert';
import unsplash from '../unsplash';

export const login = (code, history) => async (dispatch) => {
    dispatch(setLoading());

    if (code) {
        const res = await unsplash.auth.userAuthentication(code);
        const data = await res.json();
        if (res.status >= 400) {
            const error = data.error_description;
            dispatch({
                type: AUTH_ERROR,
                payload: error,
            });
            dispatch(setAlert(error), 'danger');
        } else {
            const token = data.access_token;
            unsplash.auth.setBearerToken(token);

            dispatch({
                type: LOGIN,
                payload: token,
            });

            history.push('/');
        }
    }
};

export const loginWithToken = (token) => async (dispatch) => {
    dispatch(setLoading());

    unsplash.auth.setBearerToken(token);
    dispatch({
        type: LOGIN,
        payload: token,
    });
};

export const logout = () => async (dispatch) => {
    unsplash.auth.setBearerToken(null);
    dispatch({
        type: LOGOUT,
    });
    window.location.reload();
};

export const setLoading = () => ({type: SET_AUTH_LOADING});
