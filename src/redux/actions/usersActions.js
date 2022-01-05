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
            payload: response.data
        });
        var inFifteenMinutes = new Date(new Date().getTime() + 50 * 60 * 1000);
        Cookies.set('currentUser', response.data.token, {
            expires: inFifteenMinutes
        });
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