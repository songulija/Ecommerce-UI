import ecommerceAPI from '../ecommerceAPI'
//product id and quantity
export const addToCart = (id,qty) => async(dispatch,getState)=>{
    try{
        const token = getState().usersReducer.currentUser;
        const {data} = await ecommerceAPI.get(`/api/products/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'CART_ITEM_ADD',
            payload: {
                product: data.id,
                title: data.title,
                imagePath: data.imagePath,
                price: data.price,
                quantity: data.quantity,
                qty
            }
        })
        //once we dispatch action we want to save it in local storage
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    }catch(error){  
        if(error === undefined){
            dispatch({
                type: 'ERROR',
                payload: 'Oopsie. System error. Try again later.'
            })
        }else{
            dispatch({
                type: 'ERROR',
                payload: error.response.data
            })
        }
    }
}

export const removeFromCart = (id) => (dispatch,getState)=>{
    try{
        dispatch({
            type: 'CART_REMOVE_ITEM',
            payload: id
        })
        //after dispatch save changed state in localstorage
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    }catch(error){
        dispatch({
            type: 'ERROR',
            payload: error
        })
    }
}