import {POST_LOADING, POST_WRITE, POST_DETAIL, POST_DELETE, POST_EDIT} from '../_actions/types'

const initialState = {
    posts :{
        content: []
    },
    detail :{
        onePostLoadSuccess: false,
        info:{
            postid:0,
            owner:"",
            title:"",
            contents:"",
            date:"",
            imageurl:"",
            view:"",
        },
    }
}

export default function(prevState = initialState, action){
    switch(action.type){
        case POST_LOADING:
            return {...prevState, posts: action.payload}
        case POST_WRITE:
            return {...prevState, success: action.payload}
        case POST_DETAIL:
            return {...prevState, detail: action.payload}
        case POST_DELETE:
            return {...prevState, success: action.payload}
        case POST_EDIT:
            return {...prevState, posts: action.payload}
        default:
            return prevState;
    }
}