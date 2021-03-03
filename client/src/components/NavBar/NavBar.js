import React, {Fragment, useState} from 'react'
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import {Collapse, Container, Nav, Navbar, NavbarToggler} from 'reactstrap';
import './Sections/Navbar.css';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

function NavBar() {
    const user = useSelector(state => state.user)
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
      setVisible(true)
    };
  
    const onClose = () => {
      setVisible(false)
    };

    return(
      <Fragment>
        <Navbar color="dark" expand="lg" className="sticky-top">
          <Container>
            <Link to="/" className="text-white text-decoration-none mr-5">
              오늘의 유행은 내일의 구식
            </Link>
            <LeftMenu />
            <Collapse isOpen={true} navbar>
              <Nav className="ml-auto d-flex justify-content-around" navbar>
              <NavbarToggler mode = "horizontal"/>
              <h1 color="dark"  className="text-white"><RightMenu mode = "horizontal" /></h1>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    )
}

export default NavBar
