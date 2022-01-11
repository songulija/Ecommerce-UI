export const categoriesReducer = (state = {categories: []},action)=>{
    switch(action.type){
        case 'CATEGORIES_FETCH_REQUEST':
            return {...state, loading: true}
        case 'CATEGORIES_FETCH_SUCCESS':
            return {...state, loading: false, categories: action.payload}
        case 'CATEGORIES_CREATE_REQUEST':
            return {...state, loading: true}
        case 'CATEGORIES_CREATE_SUCCESS':
            // add new object to list
            const categories = [...state.categories, {...action.payload}]
            return {...state, loading: false, 'categories':categories}
        case 'CATEGORIES_UPDATE_REQUEST':
            return {...state, loading: true }
        case 'CATEGORIES_UPDATE_SUCCESS':
            // map through categories and change obj with same id to updated one(ojb from action.payload)
            const categories = state.categories;
            const updated = categories.map(x => x.id === action.payload.id?action.payload:x)
            return {...state, loading: false, 'categories':updated}
        case 'CATEGORIES_DELETE_REQUEST':
            return {...state, loading: true}
        case 'CATEGORIES_DELETE_SUCCESS':
            // filter through categories. it will return only those elements that match condition
            const categories = state.categories.filter(x => x.id !== action.payload.id)
            return {...state, loading: false, 'categories':categories}
        case 'ERROR':
            return {...state, loading: false, error: action.payload}
        default: 
            return state;
    }
}