import React from 'react';
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {registerUser} from '../../../_actions/user_action';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Form, Input, Button,} from 'antd';
import {history} from '../../../store'

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function RegisterPage(props) {
    const dispatch = useDispatch()
    return(
        <Formik
            initialValues ={{
                id: "",
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "Tester",
            }}
            validationSchema={Yup.object().shape({
                id: Yup.string()
                .required("id is required"),
                name: Yup.string()
                .required("name is required"),
                email: Yup.string()
                .required("email is required"),
                password: Yup.string()
                .required("password is required"),
                confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'),null], 'Password must match')
                .required("confirmPassword is required"),
            })}
            onSubmit={(values, {setSubmitting}) =>{
                setTimeout(()=>{
                    let dataToSubmit ={
                        id: values.id,
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        role: values.role,
                    }
                    dispatch(registerUser(dataToSubmit)).then(response=>{
                        console.log("Payload", response.payload.success);
                        if(response.payload.success){
                            props.history.push("/login")
                            //history.push("/login")
                        }else{
                            alert(response.payload.err)
                        }
                    })
                    setSubmitting(false);
                },500)
            }}
        >
        {props =>{
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
                <div className ="app">
                    <h2>Sign up</h2>
                    <Form style={{minWidth:'375px'}} {...formItemLayout} onSubmit={handleSubmit}>
                        <Form.Item required label="Id">
                            <Input
                                id="id"
                                placeholder="Enter your ID"
                                type="text"
                                value={values.id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.id && touched.id ? 'text-input error' : 'text-input'
                                }
                            />
                            {errors.name && touched.name && (
                                <div className="input-feedback">{errors.name}</div>
                            )}
                        </Form.Item>
                        <Form.Item required label="Name">
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.name && touched.name ? 'text-input error' : 'text-input'
                                }
                            />
                            {errors.name && touched.name && (
                                <div className="input-feedback">{errors.name}</div>
                            )}
                        </Form.Item>
                        <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                            <Input
                            id="email"
                            placeholder="Enter your Email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.email && touched.email ? 'text-input error' : 'text-input'
                            }
                            />
                            {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                            )}
                        </Form.Item>
                        <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                            <Input
                            id="password"
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
                        <Form.Item required label="Confirm" hasFeedback>
                            <Input
                            id="confirmPassword"
                            placeholder="Enter your confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                            }
                            />
                            {errors.confirmPassword && touched.confirmPassword && (
                            <div className="input-feedback">{errors.confirmPassword}</div>
                            )}
                        </Form.Item>
                        <Form.Item required label="Role" hasFeedback>
                            <Input
                            id="role"
                            placeholder="Enter your role"
                            type="text"
                            value={values.role}
                            //onChange={handleChange}
                            //onBlur={handleBlur}
                            className={
                                errors.role && touched.role ? 'text-input error' : 'text-input'
                            }
                            />
                            {errors.role && touched.role && (
                            <div className="input-feedback">{errors.role}</div>
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )
        }}
        </Formik>
    )
}

export default withRouter(RegisterPage)
