import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Helmet} from 'react-helmet'
import {Button, Col, Row} from 'reactstrap'
import {detailPost,deletePost} from '../../redux/_actions/post_action'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import { Link, withRouter } from 'react-router-dom'
import { GrowingSpinner } from '../../components/Spinner/Spinner'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenAlt, faCommentDots, faMouse, faPencilAlt} from "@fortawesome/free-solid-svg-icons"
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor'
import { editorConfiguration } from '../../components/Editor/EditorConfig'
function PostDetail(props) {
    const post = useSelector((state) => state.post)
    const user = useSelector((state) => state.user)
    console.log("POST_DETAIL");
    const {id,isAuth, isAdmin} = user.userData
    console.log(user.userData);
    console.log(id,isAuth,isAdmin)
    console.log("-----------")
    const dispatch = useDispatch()
    useEffect(async ()=>{
        dispatch(detailPost(props.match.params.id))
    },[])
    console.log(post)
    console.log(post.detail)
    console.log(post.detail.info)
    console.log(post.detail.info.contents)
    const pInfo = post.detail.info

    const onDeleteClick = () => {
        dispatch(deletePost())
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
                    <Link to={`/post/${props.match.params.id}/edit`} className="btn btn-success btn-block">
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
                                    <Button color = "info"> 
                                        Category 불러와야해
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
                        <span>댓글 개수</span>
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
                </Fragment>
            ):(
                <h1>h</h1>
            )}
        </>
    )
    return (
        <div>
            <Helmet title={`${pInfo.title}`}/>
            {pInfo ? Body : GrowingSpinner}
        </div>
    )
}

export default withRouter(PostDetail
)
