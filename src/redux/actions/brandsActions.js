import ecommerceAPI from '../ecommerceAPI'

export const getBrands = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BRANDS_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.get(`/api/Brands`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'BRANDS_FETCH_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        if (error === undefined) {
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie. System error. Try again later.'
            })
        } else {
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}


export const createBrand = (postObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BRANDS_CREATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.post(`/api/Brands`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'BRANDS_CREATE_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        if (error === undefined) {
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie... Sytem error. Try again later.'
            })
        } else {
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}


export const updateBrand = (postObj, reducerObj) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BRANDS_UPDATE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.put(`/api/Brands/${reducerObj.id}`, postObj, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'BRANDS_UPDATE_SUCCESS',
            payload: reducerObj
        })
    } catch (error) {
        if (error === undefined) {
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie... System error. Try again later.'
            })
        } else {
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}

export const deleteBrand = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'BRANDS_DELETE_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        await ecommerceAPI.delete(`/api/Brands/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: 'BRANDS_DELETE_SUCCESS',
            payload: id
        })
    } catch (error) {
        if (error === undefined) {
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie... Sytem error. Try again later.'
            })
        } else {
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}