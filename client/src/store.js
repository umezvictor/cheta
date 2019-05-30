//this file contains the redux store that holds the app state
import { createStore, applyMiddleware, compose } from 'redux';
//redux thunk
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
//import rootReducer from './reducers';//can replace line above


const initialState = {};

const middleware = [thunk];

//init store for redux. param 1 = root reducer, param2
//root reducer contains all the other reducers

    const store = createStore(
        rootReducer, 
        initialState, 
        compose(
            applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//needed to implement redux devtools extension during development, remove during production
        ) 
        );

export default store;
