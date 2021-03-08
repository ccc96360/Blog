import axios from 'axios'
import {COMMENT_LOADING,COMMENT_UPLOAD,COMMENT_WRITE} from './types'

const route = process.env.REACT_APP_SERVER_ROUTES_COMMENT

export function loadComments(){
    const request = axios.get(`${route}/`)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: COMMENT_LOADING,
        payload: request
    }
}