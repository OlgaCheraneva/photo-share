import {SET_AUTH_LOADING, LOGOUT, LOGIN, AUTH_ERROR} from './types';
import {setAlert} from './alert';

export const login = (code, history) => async (dispatch) => {
    dispatch(setLoading());

    if (!code) return;

    try {
        const res = await fetch(`/api/auth?code=${code}`);
        const data = await res.json();

        if (res.ok) {
            dispatch({
                type: LOGIN,
                payload: data, // token string
            });

            history.push('/');
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: data, // error string
            });
            dispatch(setAlert(data), 'danger');
        }
    } catch (error) {
        console.error(error);
    }
};

export const loginWithToken = (token) => async (dispatch) => {
    dispatch(setLoading());

    try {
        await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}),
        });
        dispatch({
            type: LOGIN,
            payload: token,
        });
    } catch (error) {
        console.error(error);
    }
};

export const logout = () => async (dispatch) => {
    await fetch('/api/auth/logout');
    dispatch({
        type: LOGOUT,
    });
    window.location.reload();
};

export const setLoading = () => ({type: SET_AUTH_LOADING});
