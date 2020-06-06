import {
    CLEAR_USER_PROFILE,
    SET_PROFILE_LOADING,
    SET_PROFILE,
    SET_PROFILE_PHOTOS,
} from '../actions/types';

const initialState = {
    photos: [],
    profile: null,
    loading: false,
    nextPage: 1,
    limit: 5,
    orderBy: 'latest',
    errors: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload.userProfile,
                photos: [...action.payload.userOwnPhotos],
                nextPage: state.nextPage + 1,
                loading: false,
            };
        case SET_PROFILE_PHOTOS:
            return {
                ...state,
                photos: [...state.photos, ...action.payload.userOwnPhotos],
                nextPage: state.nextPage + 1,
                loading: false,
            };
        case CLEAR_USER_PROFILE:
            return {
                ...state,
                profile: null,
                photos: [],
                nextPage: 1,
                loading: false,
            };
        case SET_PROFILE_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
