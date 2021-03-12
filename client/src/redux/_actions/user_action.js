import axios from 'axios'
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from './types'

const route = process.env.REACT_APP_SERVER_ROUTES_USER

export function loginUser(dataToSubmit){
    const request = axios.post(`${route}/login`,dataToSubmit)
                        .then(response =>response.data)
    return{
        type:LOGIN_USER,
        payload: request
    }
}
export function registerUser(dataToSubmit){
    const request = axios.post(`${route}/register`,dataToSubmit)
                        .then(response =>response.data)
    return{
        type:REGISTER_USER,
        payload: request
    }
}
export function auth(){
    const request = axios.get(`${route}/auth`)
                        .then(response =>response.data)
    return{
        type:AUTH_USER,
        payload: request
    }
}
export function logoutUser(){
    const request = axios.get(`${route}/logout`)
    .then(response => response.data);
    console.log("LOOOGGGOOOUUUTTTTT",request);
    return {
        type: LOGOUT_USER,
        payload: request
    }
}