import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import "../../../assets/custom.scss"
function LeftMenu(props) {
    return (
      <Row id="L">
        <Col>
          <Link to="/" className="text-white text-decoration-none">
            Home
          </Link>
        </Col>
        <Col>  
          <Link to="/" className="text-white text-decoration-none">
            About
          </Link>
        </Col>
        <Col>
          <Link to="/" className="text-white text-decoration-none">
            Projects
          </Link>
        </Col>
      </Row>
    )
}

export default LeftMenu