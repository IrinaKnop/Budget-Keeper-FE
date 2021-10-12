import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import login from './modules/Auth/redux';
import uselessButton from './features/UselessButton/redux';
import initializeBalance from './modules/InitialBalance/redux'

function configureStore() {
    const middlewares = [
        thunk
    ];

    const reducer = combineReducers({
        login,
        uselessButton,
        initializeBalance,
    });

    return createStore(
        reducer,
        compose(
            applyMiddleware(...middlewares),
            (process.env.NODE_ENV === 'development' && window.devToolsExtension) ? window.devToolsExtension() : f => f
        )
    );
}

export default configureStore;