import ecommerceAPI from '../ecommerceAPI'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

export const login = (username, password,callback) => async(dispatch)=>{
    try{
        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })
        const postObject = {
            "username":username,
            "password":password
        }

        const response = await ecommerceAPI.post('/api/users/login', postObject) 
        
        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: response.data.token
        });
        var inFifteenMinutes = new Date(new Date().getTime() + 50 * 60 * 1000);
        Cookies.set('currentUser', response.data.token, {
            expires: inFifteenMinutes
        });
        const userData = jwt_decode(response.data.token);

        if (userData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'ADMINISTRATOR') {
            Cookies.set('role', "ADMINISTRATOR", {
                expires: inFifteenMinutes
            });
        }
        callback();

    }catch(error){
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


export const register = (postObj,callback) => async(dispatch)=>{
    try{
        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })
        const response = await ecommerceAPI.post('/api/users/register', postObj)
        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const logout = () => (dispatch) => {
    Cookies.remove('currentUser')
    Cookies.remove('role')
    dispatch({ type: 'USER_LOGOUT' });
    dispatch({ type: 'USER_DATA_REMOVE' });
}

export const getUserData = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type:'USER_DATA_SUCCESS',
            payload: Cookies.get('role')
        })
    }catch(error){
        dispatch({
            type: 'USER_DATA_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getUsers = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'USERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.get(`/api/users`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'USERS_FETCH_SUCCESS',
            payload: response.data
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'USERS_FETCH_FAIL',
                payload: 'Oopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'USERS_FETCH_FAIL',
                payload: error.response.data
            })
        }
    }
}

export const updateUser = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'USERS_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.put(`/api/users/${reducerObj.id}`,postObj, {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'USERS_UPDATE_SUCCESS',
            payload: reducerObj
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'USERS_UPDATE_FAIL',
                payload: 'Oopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'USERS_UPDATE_FAIL',
                payload: error.response.data
            })
        }
    }
}
//FOR ADMIN
export const deleteUser = (id) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'USERS_DELETE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.put(`/api/users/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'USERS_DELETE_SUCCESS',
            payload: id
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'USERS_DELETE_FAIL',
                payload: 'Oopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'USERS_DELETE_FAIL',
                payload: error.response.data
            })
        }
    }
}


export const createUser = (postObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'USERS_CREATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.post(`/api/users/create`,postObj,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'USERS_CREATE_SUCCESS',
            payload: response.data
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'USERS_CREATE_FAIL',
                payload: 'Oopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'USERS_CREATE_FAIL',
                payload: error.response.data
            })
        }
    }
}