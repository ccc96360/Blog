import React , {useState}from 'react'
import {Form, FormGroup, Label, Input, Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import { withRouter } from 'react-router-dom'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import {editorConfiguration} from '../../components/Editor/EditorConfig'
import Myinit from '../../components/Editor/UploadAdapter'
import dotenv from 'dotenv'
import { writePost } from '../../redux/_actions/post_action'

function PostWrite(props) {
    dotenv.config()
    const dispatch = useDispatch()
    const post = useSelector(state => state.post)
    const pInfo = post.detail.info
    const user = useSelector((state) => state.user)
    const {id,isAuth, isAdmin} = user.userData
    const [form, setValues] = useState({title: "", contents: "", imageUrl: "", category:""})

    const onSubmit = async(e)=>{
        await e.preventDefault();
        const {title, contents, imageUrl, category} = form
        console.log("!!!!",category, typeof(category))
        console.log("!!!!",category.split('#'));
        if(category.match('#')){
            const dataToSubmit = {title: title, owner: id, contents: contents, fileUrl: imageUrl, category: category.split('#').slice(1)}
            console.log("DATA TO SUBMIT IN WRITE!!!",dataToSubmit);
            dispatch(writePost(dataToSubmit)).then(res=>{
                props.history.push(`/posts/${res.payload.postid}`)
            })
        }else{
            alert("카테고리에 #없음!")
        }
    }
    const onChange = (e) => {
        console.log(form);
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
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
                        onReady = {Myinit}
                        onBlur = {getDataFromCKEditor}
                    />
                    <Button color="success" block className="mt-3 col-md-2 offset-md-10 mb-3" onClick={onSubmit}>
                        제출하기
                    </Button>
                </FormGroup>
                
            </Form>
        </div>
    )
}

export default withRouter(PostWrite)
