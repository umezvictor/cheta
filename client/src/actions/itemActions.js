import axios from 'axios';
import { GET_ERRORS } from './types';
import { ADD_ITEM, GET_ITEM, GET_ITEMS, EDIT_ITEM, ITEM_LOADING, DELETE_ITEM } from './types';


//add an item
//user id is used as the query parameter
export const addItem = (item, id) => dispatch => {
    
    axios.post(`/items/create/${id}`, item)
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data 
            })
            )
            .then(_ => window.location.reload())

        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
};


//fetch all items created by user, 
//user id is used as the query parameter
export const getItems = id => dispatch => {
    dispatch(setItemLoading());
    axios.get(`/items/fetch/${id}`)
        .then(res => 
            dispatch({
                type: GET_ITEMS,
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


//fetch single item, item id is used as the query parameter
export const getSingleItem = id => dispatch => {
    dispatch(setItemLoading());
    axios.get(`/items/fetch_item/${id}`)
        .then(res => 
            dispatch({
                type: GET_ITEM,
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

//edit item, item id is used as the query parameter 
export const editItem = id => dispatch => {
    
    axios.put(`/items/fetch_item/${id}`)
        .then(res => 
            dispatch({
                type: EDIT_ITEM,
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


//delete item, item id is used as the query parameter
export const deleteItem = (id) => dispatch => {
    
    axios.delete(`/items/delete_item/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM
        }))
        .then(_ => window.location.reload())

        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
         );
        
};

//item loading 
export const setItemLoading = () => {
    return {
        type: ITEM_LOADING
    }
};