import {SET_DOWNLOAD_BTN_VISIBILITY, SET_SCROLLED_BY_Y} from './types';

export const setDownloadBtnVisibility = (isVisible) => ({
    type: SET_DOWNLOAD_BTN_VISIBILITY,
    payload: isVisible,
});

export const setScrolledByY = (scrolled) => ({
    type: SET_SCROLLED_BY_Y,
    payload: scrolled,
});
