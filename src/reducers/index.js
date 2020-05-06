import {combineReducers} from 'redux';

import auth from './auth';
import alert from './alert';
import app from './app';
import photos from './photos';

export default combineReducers({auth, alert, app, photos});
