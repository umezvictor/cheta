//this is the authaction file, from here we dispatch to the reducer
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'; 
import jwt_decode from 'jwt-decode';
import { GET_ERRORS  } from './types';
import { SET_CURRENT_USER, GET_CURRENT_USER  } from './types';


/*
history allows redirection to login page, used in the signup.js file
dispatch allows for asynchronus handling, waiting for response bla bla
 export const registerUser = userData => dispatch => note: this a clearer way to put dispatch function inside registerUser function
to dispatch an action to the reducer it must have to a type
    
data needs to be handled asyncronously here.
we make a request, wai for the response before dispacthing to the reducer,
this is where thunk comes in

    
this is an action creator, Userdata is passed along
the name of the action is registerUser, it will be referenced in Signup.js

*/


export const registerUser = (userData, history) => dispatch => {


   axios.post('/users/register', userData)
   .then(res => history.push('/login'))//redirect to login page if login is successful
   .catch(err => 
        //dispatch errors to errors reducer if error occurs
        dispatch({
            type: GET_ERRORS,//errors are handled in the errorReducer
            payload: err.response.data//the error object received
        })
    );
          
 };


 //login user, get user token
 /*
get token,
store in local storage if valid,
send token along whenver a request is made to a protected route
 */
 export const loginUser = (userData) => dispatch => {
     axios.post('/users/login', userData)
        .then(res => {
            
            const { token } = res.data;
            //save token to localstorage
            localStorage.setItem('jwtToken', token);
            //set token to Auth header
            setAuthToken(token);//from utils/setAuthToken.js
            //decode token to get user data
            const decoded = jwt_decode(token);
            //setcurrentuser, created a function to handle that, then dispatched to it
            dispatch(setCurrentUser(decoded)); //dispatch to reducer
            //reducer will use the type to determine the next value of the state
            //ssetcurrentuser action has a type of set_current_user, which is associated with authReducer
            //that's how reducers know which action is meant for them
            
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
 };


 //set logged in user
 export const setCurrentUser = (decodedToken) => {
     //dispatch to the reducer
     return {
         type: SET_CURRENT_USER,  //once dispatched, it is caught in the authReducer
         payload: decodedToken//contains user info that was decoded fron token
     }
 };


 //get current user
 export const getCurrentUser = () => dispatch => {
     axios.get('/users/current')
        .then(res => 
            dispatch({
                type: GET_CURRENT_USER,
                payload: res.data
            })
            )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
 }


 //logout user
 export const logoutUser = () => dispatch => {
     //steps for logout
     //1 remove token from local storage
     localStorage.removeItem('jwtToken');
     //remove auth header for future request
     setAuthToken(false);//see setauthoken.js else condition
     //set current user to empty object which will set issuthenticated to false
     dispatch(setCurrentUser({})); 
 }
