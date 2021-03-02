import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import user from './user_reducer';

export const rootReducer = combineReducers({//여러개의 리듀서를 하나로 합쳐주는 리듀서
    user
})

export const createRootReducer = (history) => 
    combineReducers({
        router: connectRouter(history),
        user,
    })

