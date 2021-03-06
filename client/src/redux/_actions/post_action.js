import axios from 'axios'
import {POST_LOADING, POST_WRITE, POST_DETAIL, POST_DELETE, POST_EDIT, POSTS_CATEGORIES, POST_CATEGORIES, CATEGORY_POSTS, POSTS_RESET} from './types'

const route = process.env.REACT_APP_SERVER_ROUTES_POST

export function loadPost(n){
    const request = axios.get(`${route}/skip/${n}`)
                        .then(response=>response.data)
    console.log("!!!!lplplplplpplp!!!!!",n);
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

export function deletePost(id){
    const request = axios.post(`${route}/${id}/delete`)
                        .then(response=>response.data)
    return{
        type: POST_DELETE,
        payload: request
    }
}
export function editPost(id, dataToSubmit){
    console.log("In Post_ACTION!!!!!!!!!!!!!!!!!!!!",dataToSubmit)
    const request = axios.post(`${route}/${id}/edit`,dataToSubmit)
                        .then(response=>response.data)
    return{
        type: POST_EDIT,
        payload: request
    }
}

export function loadAllCategories(){
    const request = axios.get(`${route}/category`)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: POSTS_CATEGORIES,
        payload: request
    }
}
export function categoryPosts(name){
    const request = axios.get(`${route}/category/${name}`)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: CATEGORY_POSTS,
        payload: request
    }
}
export function loadPostCategories(id){
    const request = axios.get(`${route}/${id}/category`)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: POST_CATEGORIES,
        payload: request
    }
}
export function postReset(){
    return{
        type: POSTS_RESET,
    }
}