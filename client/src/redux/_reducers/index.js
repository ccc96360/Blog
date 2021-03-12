import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import user from './user_reducer';
import post from './post_reducer';
import comment from './comment_reducer';
import search from './search_reducer';
export const createRootReducer = (history) => 
    combineReducers({
        router: connectRouter(history),
        user,
        post,
        comment,
        search,
    })

