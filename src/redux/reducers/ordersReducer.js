export const ordersReducer = (state = {orders: []},action)=>{
    switch(action.type){
        case 'ORDERS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'ORDERS_FETCH_SUCCESS':
            return {...state, loading: false, orders: action.payload}
        case 'ORDERS_CREATE_REQUEST':
            return {...state, loading: true}
        case 'ORDERS_CREATE_SUCCESS':
            //add new obj to array
            const new_orders = [...state.orders,{...action.payload}]
            return {...state, loading:false, orders: new_orders}
        case 'ORDERS_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'ORDERS_UPDATE_SUCCESS':
            //map and search obj with same id as action.payload.id. then change original obj to action.payload obj
            const orders_clone = [...state.orders]
            const updated = orders_clone.map(x => x.id === action.payload.id?action.payload:x)
            return {...state, loading: false, orders: updated}
        case 'ORDERS_DELETE_REQUEST':
            return {...state, loading: true}
        case 'ORDERS_DELETE_SUCCESS':
            //returns elements that meet condition
            const updated_orders = state.orders.filter(x => x.id !== action.payload)
            return {...state, loading: false, orders: updated_orders}
        case 'ERROR':
            return {...state, loading: false, error: action.payload}
        default: 
            return state;
    }
}