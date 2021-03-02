import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import { FaCode } from "react-icons/fa";

function LandingPage(props){

    
    return(
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
        </>
    )
}

export default withRouter(LandingPage)