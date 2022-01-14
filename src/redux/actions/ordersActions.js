import ecommerceAPI from '../ecommerceAPI'

export const getOrders = () => async(dispatch,getState) => {
    try{
        dispatch({
            type: 'ORDERS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.get(`/api/orders`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'ORDERS_FETCH_SUCCESS',
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


export const createOrder = (postObj) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'ORDERS_CREATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.post(`/api/orders`,postObj,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'ORDERS_CREATE_SUCCESS',
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

export const updateOrder = (postObj,reducerObj) => async(dispatch,getState) => {
    try{
        dispatch({
            type: 'ORDERS_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.put(`/api/orders/${reducerObj.id}`,postObj,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'ORDERS_UPDATE_SUCCESS',
            payload: reducerObj
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie... System error. Try again later'
            })
        }else{
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}


export const deleteOrder = (id) => async(dispatch,getState) => {
    try{
        dispatch({
            type: 'ORDERS_DELETE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.delete(`/api/orders/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'ORDERS_DELETE_SUCCESS',
            payload: id
        })
    }catch(error){
        if(error === undefined){
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie... System error. Try again later'
            })
        }else{
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }       
    }
}