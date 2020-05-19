import {
    GET_PHOTO,
    GET_PHOTOS,
    CLEAR_PHOTO,
    UPDATE_LIKES,
    SET_LOADING,
    PHOTO_ERROR,
} from './types';
import {setAlert} from './alert';
import store from '../store';

export const getPhotos = () => async (dispatch) => {
    const {nextPage, limit, orderBy} = store.getState().photos;

    if (nextPage === 1) dispatch(setLoading());

    try {
        const res = await fetch(
            `/api/photos?page=${nextPage}&limit=${limit}&orderBy=${orderBy}`
        );
        const data = await res.json();
        if (res.ok) {
            dispatch({
                type: GET_PHOTOS,
                payload: data,
            });
        } else {
            handleError(dispatch, data);
        }
    } catch (error) {
        console.error(error);
    }
};

export const getPhoto = (id) => async (dispatch) => {
    dispatch(setLoading());

    try {
        const res = await fetch(`/api/photos/${id}`);
        const data = await res.json(); // photo object or errors [string]
        if (res.ok) {
            dispatch({
                type: GET_PHOTO,
                payload: data,
            });
        } else {
            handleError(dispatch, data);
        }
    } catch (error) {
        console.error(error);
    }
};

export const download = (photo) => async (dispatch) => {
    try {
        const res = await fetch(`/api/photos/download/${photo.id}`);
        const data = await res.json(); // photo {url} or errors [string]
        if (res.ok) {
            window.open(photo.urls.raw);
        } else {
            handleError(dispatch, data);
        }
    } catch (error) {
        console.error(error);
    }
};

export const clearPhoto = () => ({type: CLEAR_PHOTO});

export const toggleLike = ({id, liked_by_user}) => async (dispatch) => {
    const {isAuthenticated} = store.getState().auth;

    if (isAuthenticated) {
        const res = await fetch(
            `/api/photos/${liked_by_user ? 'unlike' : 'like'}/${id}`,
            {method: 'PUT'}
        );
        const photo = await res.json();

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id: photo.id,
                likes: photo.likes,
                liked_by_user: photo.liked_by_user,
            },
        });
    } else {
        const error = 'Authenticate to like photos';
        dispatch({
            type: PHOTO_ERROR,
            payload: [error],
        });
        dispatch(setAlert(error));
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
