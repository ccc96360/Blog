import React, { Fragment, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loadAllCategories, loadPost} from '../../redux/_actions/post_action'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Row } from 'reactstrap'
import {GrowingSpinner} from '../../components/Spinner/Spinner'
import PostCardOne from '../../components/Post/PostCardOne'
import Category from '../../components/Post/Category'

function PostCardList() {
    const posts = useSelector(state => state.post)
    const allCategories = posts.allCategories.categories
    const dispatch = useDispatch()
    useEffect(async ()=>{
        dispatch(loadPost()).then(response=>{
            console.log("LOAD POST RESPONS!!!!+++!!!!+!!!")
            console.log(response)
        })
        dispatch(loadAllCategories()).then(res=>{
            console.log("LOAD ALL CATEGORIES");
            console.log(res);
        })
    },[dispatch])
    console.log("PCL");
    console.log(posts);
    return (
        <Fragment>
            <Helmet title="Home"/>
            <Row className="border-bottom border-top border-primary py-2 mb-3">
                <Category allCategories={allCategories}/>
            </Row>
            <Row>
                {posts ? <PostCardOne posts = {posts.posts.content}/> : GrowingSpinner}
            </Row>
        </Fragment>
    )
}

export default withRouter(PostCardList)
