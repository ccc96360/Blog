import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from "react-redux"
import { Button, Form, FormGroup, Input, Row } from 'reactstrap'
import {uplaodComment, loadComments} from "../../redux/_actions/comment_action"
function Comment({id, userid, isAuth}) {
    const dispatch = useDispatch()
    const [form, setForm] = useState({contents: ""})
    
    const onSubmit = async(e) => {
        await e.preventDefault()
        const {contents} = form
        const dataToSubmit = {
            owner: userid,
            contents: contents
        }
        if(isAuth){
            dispatch(uplaodComment(id, dataToSubmit))
            resetValue.current.value  = ""
            setForm("")
        }
        else{
            alert("로그인 하세요.")
        }
    }
    const resetValue = useRef(null)
    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form.contents)
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Row className="p-2">
                        <div className="font-weight-bold m-1">Make Comment</div>
                        <div className="my-1"></div>
                        <Input 
                            innerRef = {resetValue}
                            type="textarea"
                            name="contents"
                            id="contents"
                            onChange={onChange}
                            placeholder={isAuth?"댓글":"로그인 하세요."}
                        />
                        <Button
                            color="primary"
                            block
                            className="mt-2 offset-md-10 col-md-2"
                        >
                            Submit
                        </Button>
                    </Row>
                </FormGroup>
            </Form>
        </>
    )
}

export default Comment
