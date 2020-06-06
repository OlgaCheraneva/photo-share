import {combineReducers} from 'redux';

import auth from './auth';
import alert from './alert';
import app from './app';
import photos from './photos';
import profile from './profile';

export default combineReducers({auth, alert, app, photos, profile});
