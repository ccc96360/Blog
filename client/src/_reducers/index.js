import {combineReducers} from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({//여러개의 리듀서를 하나로 합쳐주는 리듀서
    user
})

export default rootReducer