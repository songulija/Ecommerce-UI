export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCTS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload }
        case 'PRODUCTS_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_CREATE_SUCCESS':
            // adding new obj to products array
            const new_products = [...state.products, { ...action.payload }]
            return { ...state, loading: false, products: new_products }
        case 'PRODUCTS_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_UPDATE_SUCCESS':
            // change only that obj that have same id as action.payload obj
            const products_clone = state.products
            const updated = products_clone.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, products: updated }
        case 'PRODUCTS_DELETE_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_DELETE_SUCCESS':
            //return elements that dont have same id with action.payload
            const updated_products = state.products.filter(x => x.id !== action.payload)
            return { ...state, loading: false, products: updated_products }
        case 'ERROR':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}