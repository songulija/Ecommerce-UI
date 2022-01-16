import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {usersReducer, userInfoReducer} from './reducers/usersReducer'
import {categoriesReducer} from './reducers/categoriesReducer'
import { brandsReducer } from './reducers/brandsReducer';
import {productsReducer } from './reducers/productsReducer'
import { userTypesReducer } from './reducers/userTypesReducer';
import { ordersReducer } from './reducers/ordersReducer';
import {productDetailsReducer} from './reducers/productDetailsReducer'
import { cartReducer } from './reducers/cartReducer';
import Cookies from 'js-cookie'

const allReducers = combineReducers({
    usersReducer,
    userInfoReducer,
    categoriesReducer,
    brandsReducer,
    productsReducer,
    cart: cartReducer,
    userTypesReducer,
    ordersReducer,
    productDetailsReducer
})

//we want to get userInfo from localStorage if its there. if its  there we need to convert JSON string into object
const userInfoFromStorage = Cookies.get('currentUser') ? Cookies.get('currentUser') : null;
const userRoleFromStorage = Cookies.get('role') ? Cookies.get('role') : null;
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];//if they are not found in localStorage it will just be empty array

//and we want to add our userInfoFromStorage to initial state. add userLogin and inside set userInfo to userInfoFromStorage
//so that data will always come from local storage if its there. so that will be loaded when store is loaded
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    usersReducer: { currentUser: userInfoFromStorage },
    userInfoReducer: { role: userRoleFromStorage },
}

const middleware = [thunk];

const store = createStore(allReducers,initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;