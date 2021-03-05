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
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import Search from './normalRoute/Search';
import CategoryResult from './normalRoute/CategoryResult';
import PostCardList from './normalRoute/PostCardList';
//import {} from '../components/views/'

const MyRouter = () => (
    <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <Header />
        <Container id="main-body">
            <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/test" component={Auth(PostCardList, null)} />
            <Route exact path="/posts" component={Auth(PostWrite, null)} />
            <Route exact path="/posts/:id" component={Auth(PostDetail, null)} />
            <Route exact path="/posts/category/:categoryName" component={Auth(CategoryResult, null)} />
            <Route exact path="/search/:searchTerm" component={Auth(Search, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Redirect from= "*" to="/"/>
            </Switch>
        </Container>
        <Footer />
    </Suspense>
)

export default MyRouter;