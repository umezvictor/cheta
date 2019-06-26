//import isEmpty from '../validation/is-empty';
import { ADD_ITEM, GET_ITEMS, GET_ITEM, ITEM_LOADING, DELETE_ITEM } from '../actions/types';//catch it from authactions


//initial state of tood items
const initialState = {
    todoCreated: false,
    todos: [], //holds all items fetched using the user id
    todo:{},//when single item is fetched by the item id
    loading: false,
    itemDeleted: false
}

/*
loading is used to prevent the component from rendering when
the data is still fetching
*/

export default function(state = initialState, action){
    switch(action.type){
        case ITEM_LOADING:
            return{
                ...state,
                loading: true
            }
        case ADD_ITEM:
            return {
                ...state,
                todoCreated: true,
                todos: action.payload//action refers to the dispatch in itemActions
            }
            case GET_ITEMS:
                return {
                    ...state,
                    todoCreated: false,
                    todos: action.payload,
                    loading: false
                }
                case GET_ITEM:
                return {
                    ...state,
                    todoCreated: false,
                    todo: action.payload,
                    loading: false
                }
                case DELETE_ITEM:
                    return {
                        ...state,
                        itemDeleted: true
                    }
        default:
            return state;   
    }
}