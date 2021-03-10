import {POST_LOADING, POST_WRITE, POST_DETAIL, POST_DELETE, POST_EDIT, POSTS_CATEGORIES, POST_CATEGORIES, CATEGORY_POSTS} from '../_actions/types'

const initialState = {
    posts :{
        content: []
    },
    detail :{
        onePostLoadSuccess: false,
        info:{
            postid:0,
            owner:"",
            title:"",
            contents:"",
            date:"",
            imageurl:"",
            view:"",
        },
    },
    allCategories: {
        categories: []
    },
    categories:{
        posts_categories: []
    },
    category_posts:{
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
            return {...prevState, detail: action.payload}
        case POST_DELETE:
            return {...prevState, success: action.payload}
        case POST_EDIT:
            return {...prevState, posts: action.payload}
        case POSTS_CATEGORIES:
            return {...prevState, allCategories: action.payload}
        case POST_CATEGORIES:
            return {...prevState, categories: action.payload}
        case CATEGORY_POSTS:
            return {...prevState, category_posts: action.payload}
        default:
            return prevState;
    }
}