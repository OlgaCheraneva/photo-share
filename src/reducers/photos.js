import {
    GET_PHOTO,
    GET_PHOTOS,
    CLEAR_PHOTO,
    UPDATE_LIKES,
    PHOTO_ERROR,
    SET_LOADING,
} from '../actions/types';

const initialState = {
    photos: [],
    photo: null,
    loading: false,
    nextPage: 1,
    limit: 10,
    orderBy: 'latest',
    errors: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                photos: [...state.photos, ...action.payload],
                nextPage: state.nextPage + 1,
                loading: false,
            };
        case GET_PHOTO:
            return {
                ...state,
                photo: action.payload,
                loading: false,
            };
        case CLEAR_PHOTO:
            return {
                ...state,
                photo: null,
            };
        case UPDATE_LIKES:
            const {id} = action.payload;
            return {
                ...state,
                photo:
                    state.photo && id === state.photo.id
                        ? {...state.photo, ...action.payload}
                        : state.photo,
                photos: state.photos.map((photo) =>
                    photo.id === id ? {...photo, ...action.payload} : photo
                ),
                loading: false,
            };
        case PHOTO_ERROR:
            return {
                ...state,
                errors: [...state.errors, ...action.payload],
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
