import React, { Fragment } from 'react'
import {Row, Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap'
import {Link, withRouter} from 'react-router-dom'
/* 나중에 조회수 댓글수를 표시하기 위한 아이콘에 쓰일 예정
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMouse} from '@fortawesome/free-solid-svg-icons'
*/
function PostCardOne(props) {
    console.log("PostCardOne");
    const {posts} = props
    return (
        <Fragment>
            {
                Array.isArray(posts) ? posts.map(({postid, owner, title, contents, date, imageurl, view}) =>{
                    return (
                        <div key={postid} className="col-md-4">
                            <Link to={`/posts/${postid}`} className="text-dark text-decoration-none">
                                <Card className="mb-3">
                                    {imageurl ? (<CardImg top alt="카드이미지" src={imageurl}/>) :
                                        (<CardImg top alt="카드이미지" src="/defaultImage.png"/>)
                                    }
                                    
                                    <CardBody>
                                        <CardTitle className="text-truncate d-flex justify-content-between">
                                            <span className="text-truncate">{title}</span>
                                            {/*
                                            <span>
                                                <FontAwesomeIcon icon={faMouse} />
                                                &nbsp;&nbsp;
                                                <span>{view}</span>
                                            </span>
                                            */}
                                        </CardTitle>
                                        <Row>
                                            <Button color="primary" className="p-2 btn-block">
                                                More 
                                            </Button>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Link>
                        </div>
                    )
                }) : ""
            }
        </Fragment>
    )
}

export default withRouter(PostCardOne)

