// import {
//     GET_PHOTO,
//     GET_PHOTOS,
//     CLEAR_PHOTO,
//     CLEAR_PHOTOS,
//     UPDATE_LIKES,
//     PHOTO_ERROR,
//     SET_LOADING,
//     ADD_COMMENT,
//     SET_PHOTO_FILTER,
//     CLEAR_PHOTO_FILTER,
// } from '../actions/types';

// const initialState = {
//     photos: [],
//     loading: false,
//     limit: 5,
//     orderBy: 'latest',
//     filter: '',
//     errors: [],
// };

// export default (state = initialState, action) => {
//     switch (action.type) {
//         case GET_PHOTOS_BY_SUBSCRIPTIONS:
//             return {
//                 ...state,
//                 photos: [...state.photos, ...action.payload],
//                 loading: false,
//             };
//         case SUBSCRIPTIONS_ERROR:
//             return {
//                 ...state,
//                 errors: [...state.errors, ...action.payload],
//                 loading: false,
//             };
//         case CLEAR_SUBSCRIPTION_PHOTOS:
//             return initialState;
//         case SET_SUBSCRIPTIONS_LOADING:
//             return {
//                 ...state,
//                 loading: true,
//             };
//         default:
//             return state;
//     }
// };
