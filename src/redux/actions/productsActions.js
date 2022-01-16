import ecommerceAPI from '../ecommerceAPI'

export const getProducts = (callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'PRODUCTS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.get(`/api/Products`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'PRODUCTS_FETCH_SUCCESS',
            payload: response.data
        })
        callback()
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'ERROR',
                payload: 'Ooopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}

export const getProduct = (id,callback) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'PRODUCT_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.get(`/api/Products/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'PRODUCT_FETCH_SUCCESS',
            payload: response.data
        })
        callback();
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie... System error. Try again later.'
            })
        }else{
            dispatch({
                type:'ERROR',
                payload: error.response.data
            })
        }
    }
}


export const createProduct = (postObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'PRODUCTS_CREATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.post(`/api/Products`,postObj,{headers: {Authorization: `Bearer ${token}`}})
        console.log('yeye'+JSON.stringify(response.data))
        dispatch({
            type: 'PRODUCTS_CREATE_SUCCESS',
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

export const updateProduct = (postObj,reducerObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'PRODUCTS_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.put(`/api/Products/${reducerObj.id}`,postObj,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'PRODUCTS_UPDATE_SUCCESS',
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

export const deleteProduct = (id) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'PRODUCTS_DELETE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.delete(`/api/Products/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'PRODUCTS_DELETE_SUCCESS',
            payload: id
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