import axios from 'axios'
import {POST_LOADING, POST_WRITE} from './types'

const route = process.env.REACT_APP_SERVER_ROUTES_POST

export function loadPost(){
    const request = axios.get(`${route}/`)
                        .then(response=>response.data)
    return{
        type: POST_LOADING,
        payload: request
    }
}
export function wirtePost(dataToSubmit){
    const request = axios.post(`${route}/`, dataToSubmit)
                        .then(response=>response.data)
    return{
        type: POST_WRITE,
        paylaod: request
    }

}