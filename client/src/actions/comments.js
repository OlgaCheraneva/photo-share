import {ADD_COMMENT, PHOTO_ERROR, SET_LOADING} from './types';
import {setAlert} from './alert';
import store from '../store';

export const addComment = (comment) => async (dispatch) => {
    const {text, photoId} = comment;
    const profile = store.getState().auth.profile;
    const userId = profile.username;
    const username = profile.name;
    const avatar = profile.profile_image.large;
    const profileURI = profile.links.html;
    try {
        const res = await fetch(`/api/photos/comments/${photoId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId,
                username,
                avatar,
                profileURI,
                text,
            }),
        });
        const data = await res.json();
        if (res.ok) {
            dispatch({
                type: ADD_COMMENT,
                payload: data,
            });
        } else {
            handleError(dispatch, data);
        }
    } catch (error) {
        console.error(error);
    }
};

export const setLoading = () => ({type: SET_LOADING});

function handleError(dispatch, errors) {
    dispatch({
        type: PHOTO_ERROR,
        payload: errors,
    });
    errors.forEach((error) => dispatch(setAlert(error), 'danger'));
}
