import {SEARCH_TITLE} from '../_actions/types'

const initialState = {
    posts :{
        content: []
    }
}

export default function(prevState = initialState, action){
    switch(action.type){
        case SEARCH_TITLE:
            return {...prevState, posts: action.payload}
        default:
            return prevState;
    }
}