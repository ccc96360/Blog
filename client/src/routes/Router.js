import React, { Suspense } from 'react';
import {Switch,Route, Redirect} from "react-router-dom"
import LandingPage from '../components/LandingPage/LandingPage'
import LoginPage from '../components/LoginPage/LoginPage'
import RegisterPage from '../components/RegisterPage/RegisterPage'
import NavBar from '../components/NavBar/NavBar'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Auth from '../hoc/auth'
import {Container} from 'reactstrap'
//import {} from '../components/views/'

const MyRouter = () => (
    <Suspense fallback={(<div>Loading...</div>)}>
        <Header />
        <NavBar />
        <Container>
            <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Redirect from= "*" to="/" component={Auth(LandingPage,null)}/>
            </Switch>
        </Container>
        <Footer />
    </Suspense>
)

export default MyRouter;