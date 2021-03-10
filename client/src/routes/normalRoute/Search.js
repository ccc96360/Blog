import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams, withRouter } from 'react-router-dom'
import { searchByTitle } from '../../redux/_actions/search_action'
import { Row } from 'reactstrap'
import PostCardOne from '../../components/Post/PostCardOne'
function Search() {
    const dispatch = useDispatch()
    let {searchTerm} = useParams()
    const search = useSelector(state => state.search)
    let sInfo = search.posts.content
    useEffect(()=>{
    if(searchTerm){
        dispatch(searchByTitle(searchTerm))
    }
    
    },[dispatch, searchTerm])
    console.log("!!SS",sInfo);
    return (
        <div>
            <h4>검색결과 :{searchTerm}</h4>
            {
                (sInfo.length !== 0) ? (
                    <Row>
                        <PostCardOne posts={sInfo}/>
                    </Row>
                ): <Row>
                    <h4>{`"${searchTerm}"을(를) 포함된 제목을 갖는 게시물이 없습니다.`}</h4>
                </Row>
            }
        </div>
    )
}

export default withRouter(Search)
