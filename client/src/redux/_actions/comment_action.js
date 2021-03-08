import axios from 'axios'
import {COMMENT_LOADING,COMMENT_UPLOAD,COMMENT_WRITE} from './types'

const route = process.env.REACT_APP_SERVER_ROUTES_COMMENT

export function loadComments(postID){
    const request = axios.get(`${route}/${postID}`)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: COMMENT_LOADING,
        payload: request
    }
}
export function uplaodComment(postID, dataToSubmit){
    const request = axios.post(`${route}/${postID}`, dataToSubmit)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: COMMENT_UPLOAD,
        payload: request
    }
}