import axios from 'axios'
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {Formik} from 'formik'
import * as Yup from 'yup'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import Icon from '@ant-design/icons';
import {withRouter} from 'react-router-dom'

const {Title} = Typography

function LoginPage(props) {
    const dispatch = useDispatch()
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    }
    const initialID = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';
    /*
    const onSubmitHandler = (event) => {
        event.preventDefault();//이걸 안하면 페이지가 Refresh된다.

        let body = {
            id: ID,
            password: Password
        }
        dispatch(loginUser(body)).then(response=>{
            if(response.payload.loginSuccess){
                props.history.push('/')
            }
            else{
                alert("error")
            }
        })
    }
    */

    return(
        <Formik 
            initialValues = {{
                id: initialID,
                password: '',
            }}
            validationSchema={Yup.object().shape({
                id: Yup.string()
                .required('ID is required'),
                password: Yup.string()
                .required('Password is required'),
            })}
            onSubmit={(values, {setSubmitting})=>{
                setTimeout(()=>{
                    let dataToSubmit = {
                        id: values.id,
                        password: values.password
                    }
                    dispatch(loginUser(dataToSubmit))
                        .then(response => {
                            if(response.payload.loginSuccess){
                                window.localStorage.setItem('userID', response.payload.userID);
                                if(rememberMe === true){
                                    window.localStorage.setItem('rememberMe', values.id)
                                }else{
                                    localStorage.removeItem('rememberMe');
                                }
                                props.history.push("/");
                            }else{
                                setFormErrorMessage('Check out your ID or Password again')
                            }
                        })
                        .catch(err=>{
                            setFormErrorMessage('Check out your Account or Password again')
                            setTimeout(()=>{
                                setFormErrorMessage("")
                            }, 3000)
                        })
                    setSubmitting(false);
                }, 500)
            }}

        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                return(
                    <div className = "app">
                        <Title level={2}>Log In</Title>
                        <form onSubmit={handleSubmit} style={{width:'350px'}}>
                            <Form.Item required>
                                <Input 
                                    id="id"
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Enter your ID"
                                    type="text"
                                    value = {values.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.id && touched.id ? 'text-input error' : 'text-input'
                                    }
                                />
                            </Form.Item>
                            <Form.Item required>
                                <Input 
                                    id = "password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>
                            {formErrorMessage && (
                                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                            )}
                            <Form.Item>
                                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>Remember Me</Checkbox>
                                <div>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                    Log in
                                </Button>
                                </div>
                                <a href="/register">register now!</a>
                            </Form.Item>
                        </form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default withRouter(LoginPage)
