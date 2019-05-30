import { GET_ERRORS } from '../actions/types';
const initialState = {};//empty object, will contain the errors object

/*
in reducers, we evaluate what action happened and sent the new 
copy of the state to the store


errors reducer can also be here, but I choose to create a dedi
*/

//param1 initialState, param2 action because actions will be dispatched to this reducer
//this is also where the testing is done using switch
export default function(state = initialState, action) {
    //test the action type
    switch(action.type){
        case GET_ERRORS:
            return action.payload;//payload comes from authActions err.response.data
        default: 
        return state;//returns the state
    }
}

//in the reducer you manipulate the state to include the new user record entered