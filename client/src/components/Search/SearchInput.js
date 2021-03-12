import React, { Fragment, useRef, useState } from 'react'
import { Form, Input } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'

function SearchInput(props) {
    const [form, setValues] = useState({searchBy: ""})

    const onChange = (e) =>{
        setValues({
            ...form,
            [e.target.name] : e.target.value
        })
        console.log(form);
    }
    const onSubmit = async(e) =>{
        await e.preventDefault()
        const {searchBy} = form
        props.history.push(`/search/${searchBy}`)
        console.log("Submit searchInput");
        console.log(searchBy);
        resetValue.current.value = ""
    }
    const resetValue = useRef(null)
    return (
        <Fragment>
            <Form onSubmit={onSubmit}className="col mt-2">
                <Input 
                    name="searchBy"
                    onChange={onChange}
                    innerRef={resetValue}
                    placeholder="게시글 제목 검색"

                />
            </Form>
        </Fragment>
    )
}

export default withRouter(SearchInput)
