export const productDetailsReducer = (state ={product: null},action)=>{
    switch(action.type){
        case 'PRODUCT_FETCH_REQUEST':
            return {...state, loading: true}
        case 'PRODUCT_FETCH_SUCCESS':
            return {...state, loading: false, product: action.payload}
        case 'ERROR':
            return {...state, loading: false, error:action.payload}
        default: 
            return state;
    }
}