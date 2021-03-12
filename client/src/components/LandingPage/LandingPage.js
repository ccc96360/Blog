import React, {Fragment, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import { FaCode } from "react-icons/fa";
import {useDispatch} from 'react-redux'
import { postReset } from '../../redux/_actions/post_action';

function LandingPage(props){
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(postReset())
        }
    }, [])
    return(
        <Fragment>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}> 공사중! </span>
            </div>
        </Fragment>
    )
}

export default withRouter(LandingPage)