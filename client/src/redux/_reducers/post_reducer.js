import {POST_LOADING, POST_WRITE, POST_DETAIL} from '../_actions/types'

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
        case POST_DETAIL:
            return {...prevState, datail: action.payload}
        default:
            return prevState;
    }
}