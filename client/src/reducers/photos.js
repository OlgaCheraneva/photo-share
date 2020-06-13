import {
    GET_PHOTO,
    GET_PHOTOS,
    CLEAR_PHOTO,
    CLEAR_PHOTOS,
    UPDATE_LIKES,
    PHOTO_ERROR,
    SET_LOADING,
    ADD_COMMENT,
    SET_PHOTO_FILTER,
    CLEAR_PHOTO_FILTER,
} from '../actions/types';

const initialState = {
    photos: [],
    photo: null,
    loading: false,
    limit: 5,
    orderBy: 'latest',
    filter: '',
    errors: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                photos: [...state.photos, ...action.payload],
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
        case ADD_COMMENT:
            return {
                ...state,
                photo: {...state.photo, comments: action.payload},
            };
        case CLEAR_PHOTOS:
            return {
                ...state,
                photos: [],
                limit: 5,
                loading: false,
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
        case SET_PHOTO_FILTER:
            return {
                ...state,
                filter: action.payload,
                loading: false,
            };
        case CLEAR_PHOTO_FILTER:
            return {
                ...state,
                filter: '',
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
