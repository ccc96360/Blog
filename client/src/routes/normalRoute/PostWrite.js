import React , {useState}from 'react'
import {Form, FormGroup, Label, Input, Button} from "reactstrap"
import {useDispatch} from "react-redux"
import { withRouter } from 'react-router-dom'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import {editorConfiguration} from '../../components/Editor/EditorConfig'
import Myinit from '../../components/Editor/UploadAdapter'
import dotenv from 'dotenv'

function PostWrite() {
    dotenv.config()
    const dispatch = useDispatch()
    const [form, setValues] = useState({title: "", contents: "", imageUrl: ""})

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async(e)=>{
        await e.preventDefault()
        const {title, contents, imageUrl, category} = form
    }

    const getDataFromCKEditor = (event, editor) =>{
        const data = editor.getData()
        console.log(data)
        if(data&&data.match("<img src=")){
            const whereImg_start = data.indexOf("<img src=")
            console.log(whereImg_start)
            let whereImg_end = ""
            let ext_name_find = ""
            let result_Img_Url = ""
            const ext_name = ["jpeg", "png", "jpg", "gif"]
            for(let i = 0; i < ext_name.length; i++){
                if(data.match(ext_name[i])){
                    console.log(data.indexOf(`${ext_name[i]}`))
                    ext_name_find = ext_name[i]
                    whereImg_end = data.indexOf(`${ext_name[i]}`)
                }
            }
            console.log(ext_name_find)
            console.log(whereImg_end)
            if(ext_name_find === "jpeg"){
                result_Img_Url = data.substring(whereImg_start+10, whereImg_end+4)
            }else{
                result_Img_Url = data.substring(whereImg_start+10, whereImg_end+3)
            }
            console.log(result_Img_Url)
            console.log(process.env.REACT_APP_FILE_URL);
            setValues({
                ...form,
                contents:data,
                imageUrl:result_Img_Url
            })
        }else{
            setValues({
                ...form,
                contents:data,
                fileUrl:process.env.REACT_APP_FILE_URL
            })
        }
    }

    return (
        <div>
            <Form>
                <FormGroup className="mb-3">
                    <Label for="title">Title</Label>
                    <Input type = "text" name = "title" id = "title" className="form-control" onChange={onChange}>
                        
                    </Input>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label for="category">Category</Label>
                    <Input type = "text" name = "category" id = "category" className="form-control" onChange={onChange}>
                        
                    </Input>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label for="content">Content</Label>
                    <CKEditor 
                        editor = {ClassicEditor}
                        config = {editorConfiguration}
                        onInit = {Myinit}
                        onBlur = {getDataFromCKEditor}
                    />
                    <Button color="success" block className="mt-3 col-md-2 offset-md-10 mb-3">
                        제출하기
                    </Button>
                </FormGroup>
                
            </Form>
        </div>
    )
}

export default withRouter(PostWrite)
