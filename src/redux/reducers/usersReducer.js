
export const usersReducer = (state = { currentUser: null }, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { ...state, loading: true }
        case 'USER_REGISTER_SUCCESS':
            return { ...state, loading: false, 'register': action.payload }
        case 'USER_REGISTER_FAIL':
            return { ...state, loading: false, error: action.payload.token }
        case 'USER_LOGIN_REQUEST':
            return { ...state, loading: true }
        case 'USER_LOGIN_SUCCESS':
            return { ...state, loading: false, currentUser: action.payload }
        case 'USER_LOGIN_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}


export const userInfoReducer = (state = { role: null }, action) => {
    switch (action.type) {//switching action type/name that was dispatched
        case 'USER_DATA_SUCCESS':
            return { ...state, loading: false, 'role': action.payload};
        case 'USER_DATA_REMOVE':
            return {...state,loading: false, 'role':null}
        case 'USER_DATA_FAIL':
            return { ...state,loading: false, error: action.payload };
        default:
            return state
    }
}


