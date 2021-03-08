import {LOGIN_USER} from '../_actions/types'

const initialState = {

}

export default function(prevState = initialState, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...prevState, loginSuccess: action.payload}
            break;
    }
}