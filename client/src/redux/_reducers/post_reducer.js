import {POST_LOADING, POST_WRITE, POST_DETAIL, POST_DELETE} from '../_actions/types'

const initialState = {
    posts :{
        content: []
    },
    detail :{
        info:{}
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
        default:
            return prevState;
    }
}