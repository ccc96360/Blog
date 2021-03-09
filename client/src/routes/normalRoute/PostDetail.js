import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Helmet} from 'react-helmet'
import {Button, Col, Container, Row} from 'reactstrap'
import {detailPost,deletePost} from '../../redux/_actions/post_action'
import {loadComments,uplaodComment} from '../../redux/_actions/comment_action'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import { Link, withRouter } from 'react-router-dom'
import { GrowingSpinner } from '../../components/Spinner/Spinner'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenAlt, faCommentDots, faMouse, faPencilAlt} from "@fortawesome/free-solid-svg-icons"
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor'
import { editorConfiguration } from '../../components/Editor/EditorConfig'
import Comment from '../../components/Comment/Comment'
function PostDetail(props) {
    const post = useSelector((state) => state.post)
    const pInfo = post.detail.info
    const user = useSelector((state) => state.user)
    const comments = useSelector((state) => state.comment)
    const postID = props.match.params.id
    const {id,isAuth, isAdmin} = user.userData
    const idList = window.localStorage.getItem("PostList")
    if(!idList.includes(postID)){
        alert("잘못된 접근")
        props.history.push("/")
    }
    console.log(user.userData);
    const dispatch = useDispatch()
    useEffect(async ()=>{
        dispatch(detailPost(postID));
        dispatch(loadComments(postID));

    },[])
    console.log(pInfo)
    const cInfo = comments.comments.info;
    console.log(cInfo)
    const onDeleteClick = () => {
        if(isAdmin){
            dispatch(deletePost(postID))
            props.history.push("/test")
        }
        else{
            alert("관리자만 접근 할 수 있습니다.")
        }
    }
    const EditButton = (
        <Fragment>
            <Row className="d-flex justify-content-center pb-3">
                <Col className="col-md-3 mr-md-3">
                    <Link to="/" className="btn btn-primary btn-block">
                        Go Home
                    </Link>
                </Col>
                <Col className="col-md-3 mr-md-3">
                    <Link to={`/posts/${postID}/edit`} className="btn btn-success btn-block">
                        Edit Post
                    </Link>
                </Col>
                <Col className="col-md-3 mr-md-3">
                    <Button className = "btn-block btn-danger" onClick={onDeleteClick}>
                        Delete
                    </Button>
                </Col>
                
            </Row>
        </Fragment>
    )    
    const HomeButton = (
        <Fragment>
            <Row className = "d-flex justify-content-center pb-3">
                <Col className="col-sm-12 com-md-3">
                    <Link to="/" className="btn btn-primary btn-block">
                        Go Home
                    </Link>
                </Col>
            </Row>
        </Fragment>
    )
    const Body = (
        <>
            {isAdmin ? EditButton : HomeButton}
            <Row className = "border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between">
                {(()=>{
                    if(pInfo && pInfo.owner){
                        return( 
                        <Fragment>
                            <div className="font-weight-bold text-big">
                                <span className="mr-3">
                                    <Button color = "info ml-1"> 
                                        Category 불러와야해
                                    </Button>
                                    <Button color = "info ml-1"> 
                                        Category 불러와야해2
                                    </Button>
                                </span>
                                {pInfo.title}
                            </div>
                            <div className="align-self-end">
                                {pInfo.owner}
                            </div>
                        </Fragment>
                        )
                    }
                })()}
            </Row>
            {pInfo /*댓글있는지 확인하는 조건 추가*/? ( //댓글이 존재하면
                <Fragment>
                    <div className="d-flex justify-content-end align-items-baseline small">
                        <FontAwesomeIcon icon={faPencilAlt} />
                        &nbsp;
                        <span> {pInfo.date}</span>
                        &nbsp;&nbsp;
                        <FontAwesomeIcon icon={faCommentDots}/>
                        &nbsp;
                        <span>{cInfo.length}</span>
                        &nbsp;&nbsp;
                        <FontAwesomeIcon icon={faMouse}/>
                        <span>{pInfo.view}</span>
                    </div>
                    <Row className="mb-3">
                        <CKEditor
                            editor = {BalloonEditor}
                            data = {pInfo.contents}
                            config={editorConfiguration}
                            disabled="true"
                        />
                    </Row>
                    <Row>
                        <Container className="mb-3 border border-blue rounded">
                            {
                                Array.isArray(cInfo) ? cInfo.map(
                                    ({owner, contents, date, commentid}) => (
                                        <div key={commentid}>
                                            <Row className="justify-content-between p-2">
                                                <div className="font-weight-bold">
                                                    {owner}
                                                </div>
                                                <div className="text-small">
                                                    <span className="font-weight-bold">
                                                        {
                                                            date.split("T")[0]
                                                        }
                                                    </span>
                                                    <span>
                                                        {" " + date.split("T")[1].split(".")[0]}
                                                    </span>
                                                </div>
                                            </Row>
                                            <Row className="p-2">
                                                <div>
                                                    {contents}
                                                </div>
                                            </Row>
                                        </div>
                                    )
                                ): "댓글"
                            }
                            <Comment 
                                id = {postID}
                                userid = {id}
                                isAuth = {isAuth}
                            />
                        </Container>
                    </Row>
                </Fragment>
            ):(
                <h1>h</h1>
            )}
        </>
    )
    console.log(comments)
    return (
        <div>
            <Helmet title={`${pInfo.title}`}/>
            {pInfo ? Body : GrowingSpinner}
        </div>
    )
}

export default withRouter(PostDetail
)
