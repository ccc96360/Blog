import React, { Fragment } from 'react'
import {Row, Card, CardImg, CardBody, CardTitle, Button, Badge} from 'reactstrap'
import {Link, withRouter} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMouse} from '@fortawesome/free-solid-svg-icons'

function PostCardOne(props) {
    console.log("PostCardOne");
    const {posts} = props
    console.log(posts)
    posts.posts.content.map(({postid, owner, title, contents, date, imageurl, view}) =>{
        console.log(imageurl)
    })
    return (
        <Fragment>
            {
                Array.isArray(posts.posts.content) ? posts.posts.content.map(({postid, owner, title, contents, date, imageurl, view}) =>{
                    return (
                        <div key={postid} className="col-md-4">
                            <Link to={`/posts/${postid}`} className="text-dark text-decoration-none">
                                <Card className="mb-3">
                                    <CardImg top alt="카드이미지" src={imageurl}/>
                                    <CardBody>
                                        <CardTitle className="text-truncate d-flex justify-content-between">
                                            <span className="text-truncate">{title}</span>
                                            <span>
                                                <FontAwesomeIcon icon={faMouse} />
                                                &nbsp;&nbsp;
                                                <span>{view}</span>
                                            </span>
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

