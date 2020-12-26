import {
    SET_PROFILE,
    SET_PROFILE_LOADING,
    CLEAR_USER_PROFILE,
    SET_PROFILE_PHOTOS,
    ADD_SUBSCRIPTION,
} from './types';
import {setAlert} from './alert';
import store from '../store';

export const getUserProfile = (username) => async (dispatch) => {
    const {nextPage, limit} = store.getState().profile;

    if (nextPage === 1) dispatch(setLoading());

    try {
        const response = await fetch(
            `/api/profile/${username}?=page=${nextPage}&limit=${limit}`
        );

        const data = await response.json();
        if (response.ok) {
            dispatch({
                type: SET_PROFILE,
                payload: data,
            });
        } else {
            dispatch(setAlert(data), 'danger');
        }
    } catch (error) {
        console.error(error);
    }
};

export const getUserPhotos = (username) => async (dispatch) => {
    const {nextPage, limit} = store.getState().profile;

    if (nextPage === 1) dispatch(setLoading());

    try {
        const response = await fetch(
            `/api/profile/${username}/photos?page=${nextPage}&limit=${limit}`
        );

        const data = await response.json();
        if (response.ok) {
            dispatch({
                type: SET_PROFILE_PHOTOS,
                payload: data,
            });
        } else {
            dispatch(setAlert(data), 'danger');
        }
    } catch (error) {
        console.error(error);
    }
};

export const subscribe = (username) => async (dispatch) => {
    const userId = store.getState().auth.profile.id;
    try {
        const res = await fetch(`api/profile/subscriptions/${userId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username}),
        });
        const data = await res.json();
        if (res.ok) {
            dispatch({
                type: ADD_SUBSCRIPTION,
                payload: data,
            });
        } else {
            dispatch(setAlert(data), 'danger');
        }
    } catch (error) {
        console.error(error);
    }
};

export const clearUserProfile = () => ({type: CLEAR_USER_PROFILE});

export const setLoading = () => ({type: SET_PROFILE_LOADING});
