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
import unsplash from '../unsplash';

export const getPhotos = () => async (dispatch) => {
    const {nextPage, limit, orderBy} = store.getState().photos;

    if (nextPage === 1) dispatch(setLoading());

    const res = await unsplash.photos.listPhotos(nextPage, limit, orderBy);
    const data = await res.json();
    if (res.status >= 400) {
        handleError(dispatch, data.error_description);
    } else {
        dispatch({
            type: GET_PHOTOS,
            payload: data,
        });
    }
};

export const getPhoto = (id) => async (dispatch) => {
    dispatch(setLoading());

    const res = await unsplash.photos.getPhoto(id);
    const data = await res.json();
    if (res.status >= 400) {
        handleError(dispatch, data.error_description);
    } else {
        dispatch({
            type: GET_PHOTO,
            payload: data,
        });
    }
};

export const download = (photo) => async (dispatch) => {
    const res = await unsplash.photos.downloadPhoto(photo);
    const data = await res.json();
    if (res.status >= 400) {
        handleError(dispatch, data.error_description);
    } else {
        window.location.assign(data.url);
    }
};

export const clearPhoto = () => ({type: CLEAR_PHOTO});

export const toggleLike = ({id, liked_by_user}) => async (dispatch) => {
    const {isAuthenticated} = store.getState().auth;

    if (isAuthenticated) {
        const res = liked_by_user
            ? await unsplash.photos.unlikePhoto(id)
            : await unsplash.photos.likePhoto(id);
        const {photo} = await res.json();
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

function handleError(dispatch, error) {
    console.log(error);
    dispatch({
        type: PHOTO_ERROR,
        payload: error,
    });
    dispatch(setAlert(error), 'danger');
}
