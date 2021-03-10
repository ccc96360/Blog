import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom'
import {Row} from 'reactstrap'
import PostCardOne from '../../components/Post/PostCardOne'
import { categoryPosts } from '../../redux/_actions/post_action'
function CategoryResult() {
    const dispatch = useDispatch()
    let {categoryName} = useParams()
    const posts = useSelector(state => state.post)
    useEffect(()=>{
        dispatch(categoryPosts(categoryName))
    },[dispatch, categoryName])
    return (
        <div>
            <h4> Category: "{categoryName}"</h4>
            <Row>
                <PostCardOne posts={posts.category_posts.content}/>
            </Row>
        </div>
    )
}

export default withRouter(CategoryResult)
