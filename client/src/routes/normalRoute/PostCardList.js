import React, { Fragment,  useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loadAllCategories, loadPost} from '../../redux/_actions/post_action'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Alert, Row } from 'reactstrap'
import {GrowingSpinner} from '../../components/Spinner/Spinner'
import PostCardOne from '../../components/Post/PostCardOne'
import Category from '../../components/Post/Category'

function PostCardList() {
    const posts = useSelector(state => state.post)
    const allCategories = posts.allCategories.categories
    const dispatch = useDispatch()
    const cnt = useRef(0)
    cnt.current++;
    console.log(cnt.current);
    useEffect(async ()=>{
        console.log("ASDASDASDASDASDASDASD");
        dispatch(loadPost(0)).then(response=>{
            console.log("LOAD POST RESPONS!!!!+++!!!!+!!!")
            console.log(response)
        })
        dispatch(loadAllCategories()).then(res=>{
            console.log("LOAD ALL CATEGORIES");
            console.log(res);
        })
    },[dispatch])
    //For Infinite Scroll
    const skipNumberRef = useRef(0)
    const postCountRef = useRef(0)
    const endMsg = useRef(false)
    let postCount = posts.posts.count
    postCountRef.current = postCount - 6
    const useOnScreen = (options) =>{
        const lastPostElementRef = useRef();
        const wait = useRef(true)
        const [visible, setVisible] = useState(false);
        
        useEffect(() => {
            const observer = new IntersectionObserver(([entry]) => {
                setVisible(entry.isIntersecting);
                if(entry.isIntersecting){
                    wait.current=false
                    let remainPostCount = postCountRef.current - skipNumberRef.current
                    if(remainPostCount >= 0){
                        dispatch(loadPost(skipNumberRef.current+6)).then(res=>{wait.current=true})
                        skipNumberRef.current += 6
                        console.log("SR",skipNumberRef.current);
                    }
                    else{
                        endMsg.current = true
                    }
                }
            },options)
            if(lastPostElementRef.current){
                observer.observe(lastPostElementRef.current);
            }
            const LastElementReturnFunc = () =>{
                if(lastPostElementRef.current){
                    observer.unobserve(lastPostElementRef.current);
                }
            }
            return LastElementReturnFunc;
        }, [lastPostElementRef, options])
        return [lastPostElementRef, visible]
    };

    const [lastPostElementRef, visible] = useOnScreen({
        threshold: "0.5"
    })
    console.log(visible, "visible", skipNumberRef.current, "skipNum");

    return (
        <Fragment>
            <Helmet title="Home"/>
            <Row className="border-bottom border-top border-primary py-2 mb-3">
                <Category allCategories={allCategories}/>
            </Row>
            <Row>
                {posts ? <PostCardOne posts = {posts.posts.content}/> : GrowingSpinner}
            </Row>
            <div ref={lastPostElementRef}>{endMsg ? "" : GrowingSpinner}</div>
            { endMsg ? 
                (<div>
                    <Alert color="danger" className="text-center font-weight-bolder">
                        더 이상의 포스트는 없습니다.
                    </Alert>
                </div>)
                : ""   
            }
        </Fragment>
    )
}

export default withRouter(PostCardList)
