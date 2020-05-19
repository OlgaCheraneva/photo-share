import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

let currentState = {
    auth: {token: null},
};

store.subscribe(() => {
    let previousState = currentState;
    currentState = store.getState();

    if (previousState.auth.token !== currentState.auth.token) {
        const token = currentState.auth.token;
        if (token === null) {
            localStorage.removeItem('token');
        } else {
            localStorage.setItem('token', token);
        }
    }
});

export default store;
