//set token as Auth Header, so it is sent along to every protected resource requested
//token is stored in localstorage
import axios from 'axios';
/*
goal here is to prevent me from manually ensuring token is avaailable for each
request.

axios handles this better than fetch api

when this function is called, it automatically attaches the authorization header

*/

 //token is passed in as a parameter
const setAuthToken = token => {
    if(token){
        //apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
         //delete auth header
         delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;