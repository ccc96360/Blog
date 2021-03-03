import axios from 'axios'
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from './types'


export function loginUser(dataToSubmit){
    const request = axios.post(`${process.env.REACT_APP_SERVER_ROUTES}/login`,dataToSubmit)
                        .then(response =>response.data)
    return{
        type:LOGIN_USER,
        payload: request
    }
}
export function registerUser(dataToSubmit){
    const request = axios.post(`${process.env.REACT_APP_SERVER_ROUTES}/register`,dataToSubmit)
                        .then(response =>response.data)
    return{
        type:REGISTER_USER,
        payload: request
    }
}
export function auth(){
    const request = axios.get(`${process.env.REACT_APP_SERVER_ROUTES}/auth`)
                        .then(response =>response.data)
    return{
        type:AUTH_USER,
        payload: request
    }
}
export function logoutUser(){
    const request = axios.get(`${process.env.REACT_APP_SERVER_ROUTES}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}