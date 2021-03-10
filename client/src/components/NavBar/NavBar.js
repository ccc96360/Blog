import React, {Fragment, useEffect, useState} from 'react'
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import {Collapse, Container, Nav, Navbar, NavbarToggler, NavItem} from 'reactstrap';
import './Sections/Navbar.css';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import SearchInput from '../Search/SearchInput';

function NavBar() {
    const user = useSelector(state => state.user)
    const [visible, setVisible] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const showDrawer = () => {
      setVisible(true)
    };
  
    const onClose = () => {
      setVisible(false)
    };
    useEffect(() => {
      setIsOpen(false)
    }, [user])

    const handleToggle = () =>{
      setIsOpen(!isOpen);
    }

    return(
      <Fragment>
        <Navbar color="dark" expand="lg" className="sticky-top">
          <Container>
            <Link to="/" className="text-white text-decoration-none mr-5">
              오늘의 유행은 내일의 구식
            </Link>
            <NavbarToggler onClick={handleToggle}/>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto d-flex justify-content-around" navbar>
                <NavItem ><LeftMenu/></NavItem>
              </Nav>
              <SearchInput isOpen={isOpen} />
              <Nav className="ml-auto d-flex justify-content-around" navbar>
                <NavItem><RightMenu /></NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    )
}

export default NavBar
