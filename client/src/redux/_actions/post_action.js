import axios from 'axios'
import {POST_LOADING, POST_WRITE, POST_DETAIL, POST_DELETE} from './types'

const route = process.env.REACT_APP_SERVER_ROUTES_POST

export function loadPost(){
    const request = axios.get(`${route}/`)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: POST_LOADING,
        payload: request
    }
}
export function writePost(dataToSubmit){
    const request = axios.post(`${route}/`, dataToSubmit)
                        .then(response=>response.data)
    return{
        type: POST_WRITE,
        payload: request
    }

}
export function detailPost(id){
    console.log("In detailPost")
    console.log(id);
    const request = axios.get(`${route}/${id}`)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: POST_DETAIL,
        payload: request
    }
}

export function deletePost(dataToSubmit){
    const request = axios.post(`${route}/:id/delete`, dataToSubmit)
                        .then(response=>response.data)
    return{
        type: POST_DETAIL,
        payload: request
    }
}