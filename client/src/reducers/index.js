//this file is the root reducer that contains all other reducers
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import itemsReducer from './itemsReducer';
//add all the reducers here and export it
//to access authreducers use this.props.auth, this.props.error for errors reducer, this.props.items for itemsReducer
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    items: itemsReducer
});
//