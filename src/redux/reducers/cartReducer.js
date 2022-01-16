export const cartReducer = (state = {cartItems: []},action)=>{
    switch(action.type){
        case 'CART_ITEM_ADD':
            //if we add to cart and its already there
            const item = action.payload;
            //find if it exist in cart. for each items in current state cartItems
            const existItem = state.cartItems.find(x => x.product === item.product);
            //x.product(id) is equal to item.product(id) then

            if (existItem) {
                return {//return whatever is already in state. and for cartItems. map through cartItems
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }//if x.product(id) is equal to existItem.product(id). than just return item for thsi iteration else return x(what was)
            } else {//if it doesnt exist
                return {//return whatever is already in state. and for cartItems. add curent items and new item
                    ...state,
                    cartItems: [...state.cartItems, {...item}]
                }
            }
        case 'CART_REMOVE_ITEM':
            const updated_items = state.cartItems.filter(x => x.product !== action.payload);
            return {...state, cartItems: updated_items}
        default:
            return state;
    }
}