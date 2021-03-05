import React, { Fragment, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loadPost} from '../../redux/_actions/post_action'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Row } from 'reactstrap'
import {GrowingSpinner} from '../../components/Spinner/Spinner'
import PostCardOne from '../../components/Post/PostCardOne'

function PostCardList() {
    const posts = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(async ()=>{
        dispatch(loadPost()).then(response=>{
            console.log("LOAD POST RESPONS!!!!+++!!!!+!!!")
            console.log(response)
        })
    },[dispatch])
    return (
        <Fragment>
            <Helmet title="Home"/>
            <Row>
                {posts ? <PostCardOne posts = {posts}/> : GrowingSpinner}
            </Row>
        </Fragment>
    )
}

export default withRouter(PostCardList)
