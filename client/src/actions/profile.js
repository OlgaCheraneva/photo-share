import {
    SET_PROFILE,
    SET_PROFILE_LOADING,
    CLEAR_USER_PROFILE,
    SET_PROFILE_PHOTOS,
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

export const clearUserProfile = () => ({type: CLEAR_USER_PROFILE});

export const setLoading = () => ({type: SET_PROFILE_LOADING});
