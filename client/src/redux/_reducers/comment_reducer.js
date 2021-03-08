import {COMMENT_LOADING,COMMENT_UPLOAD} from '../_actions/types'

const initialState = {
    comments: {
        info : []
    }
}

export default function(prevState = initialState, action){
    switch (action.type) {
        case COMMENT_LOADING:
            return {...prevState, comments: action.payload}
            break;
        case COMMENT_UPLOAD:
            return {...prevState, comments: { info: [...prevState.comments.info, action.payload.info]}}
            break;
        default:
            return prevState

    }
}