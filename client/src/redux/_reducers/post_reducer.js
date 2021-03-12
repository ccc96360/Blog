import {POST_LOADING, POST_WRITE, POST_DETAIL, POST_DELETE, POST_EDIT, POSTS_CATEGORIES, POST_CATEGORIES, CATEGORY_POSTS, POSTS_RESET} from '../_actions/types'

const initialState = {
    posts :{
        loading: true,
        count: 0,
        content: [],
        allids: []
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
    },
}

export default function(prevState = initialState, action){
    switch(action.type){
        case POST_LOADING:
            return {...prevState,
                    posts:{loading:action.payload.loading,
                            count: action.payload.count,
                            content: [...prevState.posts.content, ...action.payload.content],
                            allids: action.payload.allids
                    },
                    category_posts:{content:[]}
            }
        case POST_WRITE:
            return {...prevState, success: action.payload, posts:{...prevState.posts, content:[]}}
        case POST_DETAIL:
            return {...prevState, detail: action.payload, posts:{...prevState.posts, content:[]}}
        case POST_DELETE:
            return {...prevState, success: action.payload, posts:{...prevState.posts, content:[]}}
        case POST_EDIT:
            return {...prevState, posts: action.payload, posts:{...prevState.posts, content:[]}}
        case POSTS_CATEGORIES:
            return {...prevState, allCategories: action.payload}
        case POST_CATEGORIES:
            return {...prevState, categories: action.payload, posts:{...prevState.posts, content:[]}}
        case CATEGORY_POSTS:
            return {...prevState, category_posts: action.payload, posts:{...prevState.posts, content:[]}}
        case POSTS_RESET:
            return {...prevState, posts:{content:[]}}
        default:
            return prevState;
    }
}