import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom'
import {Row} from 'reactstrap'
import PostCardOne from '../../components/Post/PostCardOne'
function CategoryResult() {
    const dispatch = useDispatch()
    let {categoryName} = useParams()
    const posts = useSelector(state => state.post)
    /*useEffect(()=>{
        dispatch()
    },[dispatch, categoryName])*/
    return (
        <div>
            <h1> Category: "{categoryName}"</h1>
        </div>
    )
}

export default withRouter(CategoryResult)
