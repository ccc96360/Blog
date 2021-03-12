import axios from 'axios'
import {SEARCH_TITLE} from './types'

const route = process.env.REACT_APP_SERVER_ROUTES_SEARCH

export function searchByTitle(keyword){
    const request = axios.get(`${route}/${keyword}`)
                        .then(response=>response.data)
    console.log(request)
    return{
        type: SEARCH_TITLE,
        payload: request
    }
}