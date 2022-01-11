import axios from 'axios'
import ecommerceAPI from '../ecommerceAPI'

export const getCategories = (callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'CATEGORIES_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.get('/api/Categories',{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'CATEGORIES_FETCH_SUCCESS',
            payload: response.data
        })
        callback()
    } catch (error) {
        if (error.response === undefined) {
            dispatch({
                type: "ERROR",
                payload: { message: "Oopsie... System error. Try again, later" },
            });
        } else {
            dispatch({
                type: "ERROR", payload: error.response.data
            });
        }
    }
}


export const getCategory = (id, callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'CATEGORY_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.get(`/api/Categories/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'CATEGORY_FETCH_SUCCESS',
            payload: response.data
        })
        callback()
    }catch(error){
        if (error.response === undefined) {
            dispatch({
                type: "ERROR",
                payload: { message: "Oopsie... System error. Try again, later" },
            });
        } else {
            dispatch({
                type: "ERROR", payload: error.response.data
            });
        }
    }
}


export const createCategory = (postObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'CATEGORIES_CREATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.post(`/api/Categories`,postObj,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'CATEGORIES_CREATE_SUCCESS',
            payload: response.data
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}


export const updateCategory = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'CATEGORIES_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.put(`/api/Categories/${reducerObj.id}`,postObj, {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'CATEGORIES_UPDATE_SUCCESS',
            payload: reducerObj
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}

export const deleteCategory = (id) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'CATEGORIES_DELETE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.delete(`/api/Categories/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'CATEGORIES_DELETE_SUCCESS',
            payload: id
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'Oopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}