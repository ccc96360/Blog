import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {auth} from '../redux/_actions/user_action'
export default function(SpecificComponent, option, adminRoute = null){

    //options => null(아무나 출입 가능), true(로그인한 유저만 출입이 가능), false(로그인한 유저는 출입 불가능)

    function AuthenticationCheck(props){
        const dispatch = useDispatch()
        useEffect(()=>{
            dispatch(auth()).then(response=>{
                console.log(response)
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        //로그인한 유저만 출입 가능 페이지에 접근할 경우
                        props.history.push('/login')
                    }
                }else{
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                        alert("관리지만 접근 가능합니다.")
                    }
                    else{
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })
        },[])

        return(
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}