import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {} from 'react-helmet'
import {} from 'reactstrap'
import {} from '../../redux/_actions/post_action'
import {} from '@ckeditor/ckeditor5-react'
import { withRouter } from 'react-router-dom'
function PostDetail() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    console.log("POST_DETAIL");
    const {id,isAuth} = user.userData
    console.log(user.userData);
    console.log(id,isAuth)
    return (
        <div>
            PostDetail
        </div>
    )
}

export default withRouter(PostDetail
)
