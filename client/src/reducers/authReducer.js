import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER } from '../actions/types';//catch it from authactions


//create initial state
const initialState = {
    isAuthenticated: false,
    user: {}
}

/*
in reducers, we evaluate what action happened and sent the new 
copy of the state to the store


errors reducer can also be here, but I choose to create a dedicated file for it
*/

//param1 initialState, param2 action because actions will be dispatched to this reducer
//this is also where the testing is done using switch
export default function(state = initialState, action) {
    //test the action type
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),//isAuthenticated's value depends on whether action.payload (i.e the decoded token) is empty or not
                user: action.payload
            }
        default: 
        return state;//returns the state
    }
}

//in the reducer you manipulate the state to include the new user record entered