import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import { FaCode } from "react-icons/fa";

function LandingPage(props){

    console.log(process.env.REACT_APP_SERVER_ROUTES)
    return(
        <Fragment>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
        </Fragment>
    )
}

export default withRouter(LandingPage)