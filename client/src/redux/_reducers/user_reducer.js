import {LOGIN_USER, REGISTER_USER,AUTH_USER, LOGOUT_USER} from '../_actions/types'

const initialState = {
    userData:{
        id: "",
        email: "",
        isAdmin: false,
        isAuth: false,
        role: "None"
    }
}

export default function(prevState = initialState, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...prevState, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            return {...prevState, register: action.payload}
            break;
        case AUTH_USER:
            return {...prevState, userData: action.payload}
            break;
        case LOGOUT_USER:
            return {...prevState }
        default:
            return prevState;
    }
}