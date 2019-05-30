import axios from 'axios';
import { GET_ERRORS } from './types';
import { ADD_ITEM } from './types';


export const addItem = (item, id) => dispatch => {
    axios.post(`/items/create/:${id}`, item)
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data 
            })
            )

        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
};