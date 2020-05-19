import {SET_DOWNLOAD_BTN_VISIBILITY, SET_SCROLLED_BY_Y} from '../actions/types';

const initialState = {
    isDownloadBtnVisible: false,
    scrolledByY: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DOWNLOAD_BTN_VISIBILITY:
            return {
                ...state,
                isDownloadBtnVisible: action.payload,
            };
        case SET_SCROLLED_BY_Y:
            return {
                ...state,
                scrolledByY: action.payload,
            };
        default:
            return state;
    }
};
