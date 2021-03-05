import {POST_LOADING, POST_WRITE} from '../_actions/types'

const initialState = {
    posts :{
        content: []
    }
}

export default function(prevState = initialState, action){
    switch(action.type){
        case POST_LOADING:
            return {...prevState, posts: action.payload}
        case POST_WRITE:
            return {...prevState, success: action.payload}
        default:
            return prevState;
    }
}