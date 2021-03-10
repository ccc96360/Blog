import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import "../../../assets/custom.scss"
import SearchInput from '../../Search/SearchInput';
function LeftMenu(props) {
    const[isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user)
    useEffect(() => {
      setIsOpen(false)
    }, [user])
    const handleToggle = () =>{
      setIsOpen(!isOpen);
    }
    return (
      <>
      <Row >
        <Col>
          <Link  to="/" className="text-white text-decoration-none">
            Home
          </Link>
        </Col>
        <Col >  
          <Link to="/profile" className="text-white text-decoration-none">
            About
          </Link>
        </Col>
        <Col>
          <Link to="/projects" className="text-white text-decoration-none">
            Projects
          </Link>
        </Col>
      </Row>
      </>
    )
}

export default LeftMenu