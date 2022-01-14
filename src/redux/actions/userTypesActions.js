import ecommerceAPI from "../ecommerceAPI";

export const getUserTypes = () => async(dispatch,getState)=>{
    try{
        dispatch({
            type: 'USER_TYPES_FETCH_REQUEST'
        })
        const token = getState().usersReducer.currentUser;
        const response = await ecommerceAPI.get(`/api/userTypes`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'USER_TYPES_FETCH_SUCCESS',
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