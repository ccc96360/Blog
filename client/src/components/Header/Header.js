import React from 'react'
import {Row, Col} from 'reactstrap'

function Header() {
    return (
        <div id="page-header" className="mb-3">
            <Row>
                <Col md="6" sm="auto" className="text-white text-center m-auto">
                    <h1 className="text-white">DevMinJ Blog</h1>
                    <p>지민재의 블로그 입니다.</p>
                </Col>
            </Row>
        </div>
    )
}

export default Header
