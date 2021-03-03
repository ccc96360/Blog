import React from 'react'
import Icon from '@ant-design/icons';
import {Col, Row} from "reactstrap"
import '../../assets/custom.scss'
function Footer() {
    const thisYear = () => {
        const year = new Date().getFullYear()
        return year
    }
    return (
        <div id="main-footer" className="text-center p-2">
            <Row>
                <Col>
                    <p>Copyright &copy; <span>{thisYear()}</span></p>
                </Col>
            </Row>
        </div>
    )
}

export default Footer
