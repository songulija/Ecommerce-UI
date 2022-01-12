export const brandsReducer = (state = {brands: []},action)=>{
    switch(action.type){
        case 'BRANDS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'BRANDS_FETCH_SUCCESS':
            return {...state, loading: false, brands: action.payload}
        case 'BRANDS_CREATE_REQUEST':
            return {...state, loading: true}
        case 'BRANDS_CREATE_SUCCESS':
            // adding new obj to array
            const new_brands = [...state.brands,{...action.payload}]
            return {...state, loading: false, brands: new_brands}
        case 'BRANDS_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'BRANDS_UPDATE_SUCCESS':
            // find element in array with same id and change it to updated one(action.payload)
            const brands_clone = [...state.brands];
            const updated = brands_clone.map(x => x.id === action.payload.id?action.payload:x)
            return {...state, loading: false, brands: updated}
        case 'BRANDS_DELETE_REQUEST':
            return {...state, loading: true}
        case 'BRANDS_DELETE_SUCCESS':
            // returns elements by specified condition
            const updated_brands = state.brands.filter(x => x.id !== action.payload)
            return {...state, loading: false, brands: updated_brands}
        case 'ERROR':
            return {...state, loading: false, error: action.payload}
        default: 
            return state;
    }
}