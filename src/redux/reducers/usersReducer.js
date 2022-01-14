
export const usersReducer = (state = { currentUser: null, users: []}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { ...state, loading: true }
        case 'USER_REGISTER_SUCCESS':
            return { ...state, loading: false, 'register': action.payload }
        case 'USER_REGISTER_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'USER_LOGIN_REQUEST':
            return { ...state, loading: true }
        case 'USER_LOGIN_SUCCESS':
            return { ...state, loading: false, currentUser: action.payload }
        case 'USER_LOGIN_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'USER_LOGOUT':
            return {...state, loading: false, currentUser: null}
        case 'USERS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'USERS_FETCH_SUCCESS':
            return {...state, loading: false, users: action.payload}
        case 'USERS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'USERS_CREATE_REQUEST':
            return {...state, loading: true}
        case 'USERS_CREATE_SUCCESS':
            //add new obj to array
            const new_users = [...state.users, {...action.payload}]
            return {...state, loading: false, users: new_users}
        case 'USERS_CREATE_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'USERS_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'USERS_UPDATE_SUCCESS':
            //map and search object with same id as action.payload.id. then change that obj to action.payload
            const users_clone = [...state.users]
            const updated_clones = users_clone.map(x => x.id === action.payload.id?action.payload:x)
            return {...state, loading: false, users: updated_clones}
        case 'USERS_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'USERS_DELETE_REQUEST':
            return {...state, loading: true}
        case 'USERS_DELETE_SUCCESS':
            //returns array that meets this condition
            const updated = state.users.filter(x => x.id !== action.payload)
            return {...state,loading: false, users: updated}
        case 'USERS_DELETE_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}


export const userInfoReducer = (state = { role: null }, action) => {
    switch (action.type) {//switching action type/name that was dispatched
        case 'USER_DATA_SUCCESS':
            return { ...state, loading: false, role: action.payload};
        case 'USER_DATA_REMOVE':
            return {...state,loading: false, role:null}
        case 'USER_DATA_FAIL':
            return { ...state,loading: false, error: action.payload };
        default:
            return state
    }
}


