import isEmpty from '../validation/is-empty';
import { ADD_ITEM } from '../actions/types';//catch it from authactions
import { connect } from 'react-redux';

//initial item state
const initialState = {
    item: {}
}


export default function(state = initialState, action){
    switch(action.type){
        case ADD_ITEM:
            return {
                ...state,
                item: action.payload//action refers to the dispatch in itemActions
            }
        default:
            return state;   
    }
}